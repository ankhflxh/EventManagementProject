const express = require('express');
const RouteAttendees = express.Router();

//import controllers
const attendeeController = require('../controllers/attendeeController');

attendeesRoutes
        .get('/', attendeeController.getAllAttendees)

module.exports = RouteAttendees;