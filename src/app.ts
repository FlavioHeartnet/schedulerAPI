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
    refreshToken: ""
}
const app = express()
const port = 3000
const env = dotenv.config()
const token: any = process.env.ACCESS_TOKEN_SECRET  

app.use(bodyParser.json())
app.use(cookieParser())
const verify = (req: any, res: any, next: any) => {

    const accessToken = req.cookies.jwt
    if(!accessToken){
        return res.json({
            Error: "Não ha token valido ativo "+ accessToken
        })
    }

    let payload
    try{ 
        payload = jwt.verify(accessToken, token)
        next()
    }catch(e){
        res.status(401).send()
    }

    console.log(payload)

}

app.post('/login', async (req, res) => {

    await auth.signInWithEmailAndPassword(req.body.email, req.body.password).then((a) => {

            console.log(a.user)
            currentUser.username = req.body.email

    }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;

        res.json({
            Error: errorMessage,
            ErrorCode: errorCode
        })
    })
  
    
    let accessToken = req.cookies.jwt
    let payload: String | object = ""
    if(!accessToken){
        accessToken = jwt.sign(currentUser, token, {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        })

        let refreshToken  = jwt.sign(currentUser, token, {
            algorithm: "HS256",
            expiresIn: process.env.REFRESH_TOKEN_LIFE
        })

        currentUser.refreshToken = refreshToken
    }else{
         payload = jwt.verify(accessToken, token)
    }

    res.cookie("jwt", accessToken, {secure: true, httpOnly: true})
    res.json({
        token: accessToken,
        email: currentUser.username,
        payload: payload
    })


})
app.post('/refresh',verify,  (req, res) => {

    const accessToken = req.cookies.jwt

    if (!accessToken){
        return res.status(403).send()
    }
    let payload
    try{
        
        payload = jwt.verify(accessToken, token)
        
    }catch(e){
        res.status(401).send()
    }

    const refreshToken = currentUser.refreshToken
    try{
        jwt.verify(refreshToken, token)
    }
    catch(e){
        return res.status(401).send()
    }

    let newToken = jwt.sign(currentUser, token, 
        {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        })

        res.cookie("jwt", newToken, {secure: true, httpOnly: true})
        res.send()


})

app.get('/',verify, async (req, res) => {

    const client = new ClientController();
    client.insert();

    const result = {
        Status : true,
        Nome: "Flavio"
    }


    res.json(result)

})

app.listen(port, () => console.log(`{rodando na porta http://localhost:${port}/)`))