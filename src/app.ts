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

const app = express()
const port = 3000
const env = dotenv.config()
const token: any = process.env.ACCESS_TOKEN_SECRET  

app.use(bodyParser.json())
app.use(cookieParser())
const verify = async (req: any, res: any, next: any) => {

    const accessToken: string = req.header("Authorization").substr(7)

    //let [header, payload, signature] = accessToken.split(".")

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


}

app.post('/login', async (req, res) => {

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


})
app.post('/refresh',verify,  (req, res) => {

    const accessToken = req.header("authentication")
    
    if (!accessToken){
        return res.status(403).send()
    }
    let payload
    try{
        
        payload = jwt.verify(accessToken, token)
        
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
        Nome: "Flavio"
    }

    res.json(result)
})

app.post('/cliente', verify, (req, res)=>{
    const client = new ClientController();
    try{
        const nome = req.body.nome
        const cpf = req.body.cpf
        const DataNascimento = req.body.DataNascimento
        client.insert(nome, cpf, DataNascimento)
        res.json({
            Nome: nome,
            cpf: cpf,
            DataNascimento: DataNascimento
        })
    

    }catch(e){
        console.log(e)
        res.json({
            ErroMessage: e
        })
    }

    
})

app.listen(port, () => console.log(`{rodando na porta http://localhost:${port}/)`))