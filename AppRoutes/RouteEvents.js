const express = require('express');
const RouteEvents = express.Router();

// import controllers
const eventsController = require('../Controllers/ControllerEvents');
const attendeeController = require('../Controllers/ControllerAttendee');

RouteEvents
        .get('/', eventsController.getAllEvents)
        .post('/', eventsController.createEvent)
        .get('/:eventId', eventsController.getOneEvent)
        .get('/:eventId/attendees', attendeeController.getAttendeesOfOneEvent)
        .post('/:eventId/attendees', attendeeController.createAttendeeForEvent)
        .get('/:eventId/attendees/:attendeeId', attendeeController.getOneAttendeeInOneEvent)

        .put('/:eventId/attendees/:attendeeId', attendeeController.editOneAttendeeForOneEvent)
        .delete('/:eventId/attendees/:attendeeId', attendeeController.deleteOneAttendeeFromOneEvent)


module.exports = RouteEvents;