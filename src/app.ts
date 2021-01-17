import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
//import {auth, requiresAuth } from "express-openid-connect"
import ClientController from "./Controller/ClienteController"
import jwt from "jsonwebtoken"
import {auth} from "./firebase"


let currentUser = {
    username: "",
}

/*process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    // Application specific logging, throwing an error, or other logic here
  });*/

const app = express()
const port = 3000
const env = dotenv.config()
const token: any = process.env.ACCESS_TOKEN_SECRET  

app.use(bodyParser.json())
app.use(cookieParser())
const verify = async (req: any, res: any, next: any) => {

    try{
        const accessToken: string = req.header("Authorization").substr(7)
        if(!accessToken){
            return res.json({
                Error: "Não ha token valido ativo "
            })
        }
        try{ 
            await jwt.verify(accessToken, token)
            next()
        }catch(e){
            console.log(e)
            res.send("Token expirado ou incorreto")
            
        }
    }catch(e){
        res.send("Token necessario")
    } 


}

app.post('/login', async (req, res) => {

    try{
        await auth.signInWithEmailAndPassword(req.body.email, req.body.password).then((a) => {

            //console.log(a.user)
            currentUser.username = req.body.email

    }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;

        res.json({
            Error: errorMessage,
            ErrorCode: errorCode
        })
    })
  
    
    let accessToken = ""
        accessToken = jwt.sign(currentUser, token, {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        })

        
    
    res.json({
        token: accessToken,
        User: currentUser
    })
    }catch(e){
        res.json({
            Error: "Dados inseridos incorretamente verifique o formato da request desta API: /login"
        })
    }

})
app.post('/refresh',verify,  (req, res) => {

    const accessToken = req.header("authentication")
    
    if (!accessToken){
        return res.status(403).send()
    }
    
    try{
        
       jwt.verify(accessToken, token)
        
    }catch(e){
        res.status(401).send()
    }

  
    let newToken = jwt.sign(currentUser, token, 
        {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        })

        
        res.json({
            token: newToken,
            email: currentUser.username
        })

})

app.get('/',verify, async (req, res) => { 

    const result = {
        Status : true,
        Text: "API Logged"
    }

    res.json(result)
})

app.route("/Cliente")
.post(verify, (req, res)=>{
    
    try{
        const client = new ClientController();
        const nome = req.body.nome
        const cpf = req.body.cpf
        const DataNascimento = req.body.DataNascimento
        client.insert(nome, cpf, DataNascimento).then((a)=>{
            if(a.id != ""){
                res.json({
                    id: a.id,
                    Nome: nome,
                    cpf: cpf,
                    DataNascimento: DataNascimento
                })
            }else{
                res.json({
                    Status: -1,
                    Error: a.error 
                })
            }
        }).catch((e)=>{
            console.log(e)
        })
       
    

    }catch(e){
        console.log(e)
        res.json({
            Error: "Dados inseridos incorretamente verifique o formato da request desta API: /Cliente - POST: inserir"
        })
    }
})
.get(verify, (req, res)=>{
    const client = new ClientController()
    try{
        const id = req.body.id
        const nome = req.body.nome
        const cpf = req.body.cpf
        const DataNascimento = req.body.DataNascimento
      client.update(id, nome, cpf, DataNascimento).then((a)=>{
          if(a.id != ""){
            res.json({
                Nome: nome,
                cpf: cpf,
                DataNascimento: DataNascimento
            })
          }else{
            res.json({
                Status: -1,
                Error: a.error  
            })
          }
      })
        
        
    }catch(e){
        res.send("Dados inválidos ou não informado corretamente!")
    }
    

})

app.get("/Clientes", verify, (req, res)=>{
    const client = new ClientController()
    client.getAll().then((a) =>{
        res.json(a)
    })
    
})

app.get("/clientesbyid/:id", verify, (req, res)=>{
    const client = new ClientController()
    client.getById(req.params.id).then((a)=>{
        res.json(a)
    })

})

//Agendamentos





app.listen(port, () => console.log(`{rodando na porta http://localhost:${port}/)`))