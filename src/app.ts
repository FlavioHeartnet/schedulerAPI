import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import CustomerController from './controller/customerController'
import jwt, { Secret } from 'jsonwebtoken'
import { auth } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import AppointmentController from './controller/appointmentController'
import Customer from './model/customer'

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
      const clientController = new CustomerController()
      const name = req.body.name
      const registrationId = req.body.registrationId
      const birthdate = req.body.birthdate
      const client: Customer = {
        name: name,
        registrationId: registrationId,
        birthdate: birthdate,
      }
      clientController
        .insert(client)
        .then((a) => {
          res.json({
            id: a.message,
            name: name,
            registrationId: registrationId,
            birthdate: birthdate,
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
    const clientController = new CustomerController()
    try {
      const id = req.body.id
      const name = req.body.name
      const registrationId = req.body.registrationId
      const birthdate = req.body.birthdate
      const customer: Customer = {
        name: name,
        registrationId: registrationId,
        birthdate: birthdate,
      }
      clientController
        .update(customer, id)
        .then(() => {
          res.json({
            name: name,
            registrationId: registrationId,
            birthdate: birthdate,
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
    const appointment = new AppointmentController()
    const data = req.body.data
    appointment
      .insert(data)
      .then((a) => {
        res.json({
          id: a.message,
          data: data,
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
    const appointment = new AppointmentController()
    const id = req.body.id
    const data = req.body.Data
    const serviceDoneAt = req.body.serviceDoneAt
    const notes = req.body.notes
    appointment
      .update(id, data)
      .then((a) => {
        res.json({
          id: a?.message,
          data: data,
          serviceDoneAt: serviceDoneAt,
          notes: notes,
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
