const express = require('express');
const RouteAttendees = express.Router();
const auth = require ('../Middleware/Authenication')

//import controllers
const attendeeController = require('../Controllers/ControllerAttendee');

RouteAttendees
        .get('/',auth, attendeeController.getAllAttendees)

module.exports = RouteAttendees;