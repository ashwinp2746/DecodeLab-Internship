import express from 'express'
import { Router } from 'express'
import authController from '../controller/auth.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'

const authRoute = express.Router()

authRoute.post('/register' , authController.register)
authRoute.post('/login' , authController.login)
authRoute.get('/profile' , authMiddleware , authController.getProfile)

export default authRoute