import express from 'express';
import { prisma } from '../../lib/prismaClient.js';
import { get } from 'https';

async function registerUser(req,res) {
    try {

        const { name, email, age } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const user = await prisma.user.create({
            data: {
                name,
                email,
                age: parseInt(age)
            }
        });

        res.status(201).json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function getUsers(req,res){
    const user = await prisma.user.findMany();

    res.status(200).json(user)
}

async function getUserByID(req,res){
    const user = await prisma.user.findUnique({
        where:{
            id:Number(req.params.id)
        }
    });

    if(!user){
        return res.status(404).json({
            message:"User not exist"
        })
    }

    return res.json(user);
}

async function updateUser(req,res) {
    try{
        const updateUser = await prisma.user.update({
            where:{
                id:Number(req.params.id)
            },
            data:req.body
        });

        res.json(updateUser);
    }
    catch{
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
    }
}

async function deleteUser(req,res) {
    try{
        const user = await prisma.user.delete({
            where:{
                id:Number(req.params.id)
            }
        })

        res.json({
            message:"User Deleted Successfully"
        })
    }
    catch{
        return res.json({
            success:false,
            message:"User not found"
        })
    }
}

export default {
    registerUser,
    getUsers,
    getUserByID,
    updateUser,
    deleteUser
}