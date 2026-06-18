import express from 'express'
import { prisma } from './lib/prismaClient.js'
import 'dotenv'
import authRoute from './src/routes/auth.routes.js';

const app = express();
app.use(express.json());

app.get('/' , (req,res) =>{
    res.send("Hello world");
})

app.use('/api/auth' , authRoute)

app.listen(process.env.PORT , ()=>{
    console.log("Server running")
})