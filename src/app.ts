import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import CustomerController from './controller/customerController'
import AgendamentosController from './controller/appointmentController'
import jwt, { Secret } from 'jsonwebtoken'
import { auth } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const currentUser = {
  username: '',
}

/* process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
  });*/

const app = express()
const port = 3000
const token: Secret = process.env.ACCESS_TOKEN_SECRET as Secret

app.use(bodyParser.json())
app.use(cookieParser())
const verify = async (req, res, next) => {
  try {
    const accessToken: string = req.header('Authorization').substr(7)
    if (!accessToken) {
      return res.json({
        Error: 'Não ha token um valido',
      })
    }
    try {
      await jwt.verify(accessToken, token)
      next()
    } catch (e) {
      console.log(e)
      res.send('Token expirado ou incorreto')
    }
  } catch (e) {
    res.send('Token necessario')
  }
}

app.post('/login', async (req, res) => {
  try {
    await signInWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then(() => {
        currentUser.username = req.body.email
      })
      .catch((error: { code; message }) => {
        const errorCode = error.code
        const errorMessage = error.message

        res.json({
          Error: errorMessage,
          ErrorCode: errorCode,
        })
      })

    let accessToken = ''
    accessToken = jwt.sign(currentUser, token, {
      algorithm: 'HS256',
      expiresIn: process.env.ACCESS_TOKEN_LIFE,
    })

    res.json({
      token: accessToken,
      User: currentUser,
    })
  } catch (e) {
    res.json({
      Error:
        'Dados inseridos incorretamente verifique o formato da request desta API: /login',
    })
  }
})
app.post('/refresh', verify, (req, res) => {
  const accessToken = req.header('authentication')

  if (!accessToken) {
    return res.status(403).send()
  }

  try {
    jwt.verify(accessToken, token)
  } catch (e) {
    res.status(401).send()
  }

  const newToken = jwt.sign(currentUser, token, {
    algorithm: 'HS256',
    expiresIn: process.env.ACCESS_TOKEN_LIFE,
  })

  res.json({
    token: newToken,
    email: currentUser.username,
  })
})

app.get('/', verify, async (_req, res) => {
  const result = {
    Status: true,
    Text: 'API Logged',
  }

  res.json(result)
})

app
  .route('/Cliente')
  .post(verify, (req, res) => {
    try {
      const client = new CustomerController()
      const nome = req.body.nome
      const cpf = req.body.cpf
      const DataNascimento = req.body.DataNascimento
      client
        .insert(nome, cpf, DataNascimento)
        .then((a) => {
          res.json({
            id: a.message,
            Nome: nome,
            cpf: cpf,
            DataNascimento: DataNascimento,
          })
        })
        .catch((error) => {
          res.sendStatus(500).json({
            Status: -1,
            Error: error.message,
          })
        })
    } catch (e) {
      res.json({
        Error:
          'Dados inseridos incorretamente verifique o formato da request desta API: /Cliente - POST: inserir',
      })
    }
  })
  .get(verify, (req, res) => {
    const client = new CustomerController()
    try {
      const id = req.body.id
      const nome = req.body.nome
      const cpf = req.body.cpf
      const DataNascimento = req.body.DataNascimento
      client
        .update(id, nome, cpf, DataNascimento)
        .then((a) => {
          res.json({
            Nome: nome,
            cpf: cpf,
            DataNascimento: DataNascimento,
          })
        })
        .catch((error) => {
          res.sendStatus(500).json({
            Status: -1,
            Error: error.message,
          })
        })
    } catch (e) {
      res.send('Dados inválidos ou não informado corretamente!')
    }
  })

app.get('/Clientes', verify, (_req, res) => {
  const client = new CustomerController()
  client.getAll().then((a) => {
    res.json(a)
  })
})

app.get('/clientesbyid/:id', verify, (req, res) => {
  const client = new CustomerController()
  client.getById(req.params.id).then((a) => {
    res.json(a)
  })
})

// Agendamentos
app.post('/agendamentos/insert', verify, (req, res) => {
  try {
    const agendamento = new AgendamentosController()
    const data = req.body.Data
    const servRealizado = false
    const observacao = req.body.Observacao
    agendamento
      .insert(data, observacao, servRealizado)
      .then((a) => {
        res.json({
          id: a.message,
          Data: data,
          Observacao: observacao,
        })
      })
      .catch((error) => {
        res.sendStatus(500).json({
          Status: -1,
          Error: error.message,
        })
      })
  } catch (e) {
    res.send('Dados inválidos ou não informado corretamente!')
  }
})

app.post('/agendamentos/update', verify, (req, res) => {
  try {
    const agendamento = new AgendamentosController()
    const id = req.body.id
    const data = req.body.Data
    const servRealizado = req.body.Serv_realizado
    const Observacao = req.body.Observacao
    agendamento
      .update(id, data, new Date(), Observacao, servRealizado)
      .then((a) => {
        res.json({
          id: a?.message,
          Data: data,
          Observacao: Observacao,
        })
      })
      .catch((error) => {
        res.sendStatus(500).json({
          Status: -1,
          Error: error.message,
        })
      })
  } catch (e) {
    res.send('Dados inválidos ou não informado corretamente!')
  }
})

app.listen(port, () =>
  console.log(`{rodando na porta http://localhost:${port}/)`)
)
