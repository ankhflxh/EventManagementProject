const express = require('express');
const RouteAuth = express.Router();

//import controllers
const authController = require('../Controllers/ControllerAuth');

authRouter
        .post('/register', authController.registerUser)
        .post('/login', authController.loginUser)
        .post('/logout', authController.logoutUser)

module.exports = RouteAuth;