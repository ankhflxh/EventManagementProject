const express = require('express');
const RouteAttendees = express.Router();

//import controllers
const attendeeController = require('../Controllers/ControllerAttendee');

attendeesRoutes
        .get('/', attendeeController.getAllAttendees)

module.exports = RouteAttendees;