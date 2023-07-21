

const express =require('express');
const AuthController = require('../auth/auth.controller')

const AuthRoutes = express.Router();

AuthRoutes.post('/auth/signup', AuthController.createUserController);
AuthRoutes.post('/auth/login', AuthController.loginUserController);


module.exports= AuthRoutes;