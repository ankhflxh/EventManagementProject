const express = require('express');
const RouteEvents = express.Router();

// import controllers
const eventsController = require('../Controllers/ControllerEvents');
const attendeeController = require('../Controllers/ControllerAttendee');

RouteEvents
        .get('/GetAllEvents', eventsController.getAllEvents)
        .post('/CreateEvent', eventsController.createEvent)
        .get('/GetOneEvent/:eventId', eventsController.getOneEvent)
        .get('/GetAttendeeOfOneEvent/:eventId/attendees', attendeeController.getAttendeesOfOneEvent)
        .post('/CreateAttendeeForEvent/:eventId/attendees', attendeeController.createAttendeeForEvent)
        .get('/:eventId/attendees/:attendeeId', attendeeController.getOneAttendeeInOneEvent)

        .put('/:eventId/attendees/:attendeeId', attendeeController.editOneAttendeeForOneEvent)
        .delete('DeleteAttendeeForEvent/:eventId/attendees/:attendeeId', attendeeController.deleteOneAttendeeFromOneEvent)


module.exports = RouteEvents;