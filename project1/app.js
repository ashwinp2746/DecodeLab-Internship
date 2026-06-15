const express = require('express')
const app = express()

app.use(express.json());

app.get('/' , (req,res) => {
    res.send("Hello World");
})

//get user by id
app.get('/api/getUser/:id' , (req,res)=> {

    const userID = Number(req.params.id)

    const user = users.find(u => u.id === userID)

    if(!user){
        return res.status(401).json({
            success:false,
            message:"Invalid user"
        })
    }
    
    res.status(200).json({
        success:true,
        message:'data retrieve successfully',
        data:user
    })
})

//get all users
app.get('/api/getUser' , (req,res) => {
    res.status(201).json({
        success:true,
        message:'Data retrieve',
        data:users
    })
})

//post users
const users=[];

app.post('/api/createUser', (req,res) => {
    const {name , email ,role} = req.body;

    if(!name|| !email || !role){
        return res.status(400).json({
            success:false,
            message:"Enter valid Details"
        })
    }

    const newUser = {
        id:Date.now(),
        name,
        email,
        role
    }

    users.push(newUser)

    res.status(201).json({
        success:true,
        message:"User Created Successfully",
        data:newUser
    })
})

module.exports = app