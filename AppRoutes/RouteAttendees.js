const express = require('express');
const RouteAttendees = express.Router();
const auth = require ('../Middleware/Authenication')

//import controllers
const attendeeController = require('../Controllers/ControllerAttendee');

RouteAttendees
        .get('/GetTheAttendees',auth, attendeeController.GetTheAttendees)
        .get('/GetOneAttendee/:id',auth, attendeeController.GetOneAttendee)
        .post('/CreateAttendee', auth, attendeeController.CreateAttendee)
module.exports = RouteAttendees;