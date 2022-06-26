import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import CustomerController from '../../../controller/customerController'
import jwt, { Secret } from 'jsonwebtoken'
import { auth } from '../../firestoreDb/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import AppointmentController from '../../../controller/appointmentController'
import config from '../../config'

const currentUser = {
  username: '',
}

/* process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
  });*/

const app = express()
const port = 3000
const token: Secret = config.accessTokenSecret as Secret

app.use(bodyParser.json())
app.get('/healthz', (_req, res) => {
  res.send('OK')
})
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
      .catch((error: { code; message }) =>
        res.json({
          Error: error.message,
          ErrorCode: error.code,
        })
      )
    res.json({
      token: jwt.sign(currentUser, token, {
        algorithm: 'HS256',
        expiresIn: config.accessTokenLife,
      }),
      user: currentUser,
    })
  } catch (e) {
    res.status(500).send({
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
      const client = {
        name: name,
        registrationId: registrationId,
        birthdate: birthdate,
      }
      clientController
        .newCustomer(client)
        .then((a) => {
          res.json({
            id: a.message,
            name: name,
            registrationId: registrationId,
            birthdate: birthdate,
          })
        })
        .catch((error) => {
          res.status(500).send({
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
      const customer = {
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
    const date = req.body.date
    const notes = req.body.notes
    appointment
      .newAppointment(date, notes, false)
      .then((a) => {
        res.json({
          id: a.message,
          date: date,
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
    const date = req.body.date
    const notes = req.body.notes
    const isDone = req.body.isDone
    appointment
      .updateAppointment(id, date, notes, isDone)
      .then((a) => {
        res.json({
          id: a?.message,
          date: date,
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
