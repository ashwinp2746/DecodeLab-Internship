//start server
import express from "express"
import 'dotenv'
import { prisma } from "./lib/prismaClient.js"
import cookieParser from "cookie-parser"
import authRoute from './src/router/auth.route.js'

const app = express()
app.use(express.json())
app.use(cookieParser())

app.get('/' , (req,res) =>{
    res.send("Hello World")
})

app.use('/api/user' , authRoute)

app.listen(process.env.PORT , ()=>{
    console.log("Server Running")
})