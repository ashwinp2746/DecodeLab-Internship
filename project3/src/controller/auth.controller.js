import express from 'express'
import {prisma} from '../../lib/prismaClient.js'
import argon2 from "argon2"
import jwt from 'jsonwebtoken'
import 'dotenv'

async function register(req,res) {
    const {name , email , password} = req.body

    const isUserExists = await prisma.user.findUnique({
        where:{email}
    })
    
    if (isUserExists) {
        return res.status(400).json({
            success: false,
            message: "Email already exists"
        });
    }

    try {
        
        const hashPassword = await argon2.hash(password,{
            type:argon2.argon2id
        })

        const user = await prisma.user.create({
            data:{
                name,
                email,
                password:hashPassword,
            }
        })

        res.status(201).json({
            message:"User Registered Successfully",
            user
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

async function login(req,res) {
    try {
        const {email , password} = req.body

        const user = await prisma.user.findUnique({
            where:{email}
        })

        if(!user){
            return res.status(404).json({
                message:"User Not Found"
            })
        }

        const validPassword = await argon2.verify(user.password , password)
        if(!validPassword){
            return res.status(401).json({
                message:"Invalid Credentials"
            })
        }

        const token = jwt.sign({
            id:user.id
        },process.env.JWT_SECRET)

        res.cookie("token" , token);
        
        res.status(200).json({
            message:"Login Successfully",
            token
        })

    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

async function getProfile(req,res) {
    
    const user = await prisma.user.findUnique({
        where:{
            id:req.user.id
        }
    })

    res.json(user)
}


export default {
    register,
    login,
    getProfile
}