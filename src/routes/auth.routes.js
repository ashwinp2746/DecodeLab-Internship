import express from 'express'
import authController from '../controller/auth.controller.js';

const authRoute = express.Router();

authRoute.post('/register' , authController.registerUser)
authRoute.get('/users' , authController.getUsers)
authRoute.get('/user/:id' , authController.getUserByID)
authRoute.put('/user/:id' , authController.updateUser)
authRoute.delete('/user/:id' , authController.deleteUser)

export default authRoute;