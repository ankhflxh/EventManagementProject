const express = require('express');
const RouteAuth = express.Router()

//import controllers
const authController = require('../Controllers/ControllerAuth');

RouteAuth.post('/register',authController.registerClient)
RouteAuth.post('/login', authController.loginClient)
RouteAuth.post('/logout', authController.logoutClient)

module.exports = RouteAuth;