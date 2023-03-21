const express = require("express");
const RouteEvents = express.Router();
const auth = require("../Middleware/Authenication");
const { authRole } = require("../Middleware/ClientAuth");

// import the controllers
const eventsController = require("../Controllers/ControllerEvents");
const attendeeController = require("../Controllers/ControllerAttendee");

RouteEvents.get(
  "/GetAllEvents",
  auth,
  authRole("admin"),
  eventsController.getAllEvents
)
  .post("/CreateEvent", auth, eventsController.createEvent)
  .get("/GetUserEvent", auth, eventsController.getUserEvent)
  .get(
    "/GetOneEvent/:eventId",
    auth,
    authRole("admin"),
    eventsController.getOneEvent
  )
  .get(
    "/GetAttendeeOfOneEvent/:eventId/attendees",
    auth,
    authRole("admin"),
    attendeeController.getAttendeesOfOneEvent
  )
  .patch("/UserUpdateEvent/:eventId", auth, eventsController.userUpdateEvent)
  .post(
    "/CreateAttendeeForEvent/:eventId/attendees",
    attendeeController.createAttendeeForEvent
  )
  .get(
    "/:eventId/attendees/:attendeeId",
    attendeeController.getOneAttendeeInOneEvent
  )

  .put(
    "/:eventId/attendees/:attendeeId",
    attendeeController.editOneAttendeeForOneEvent
  )
  .delete(
    "DeleteAttendeeForEvent/:eventId/attendees/:attendeeId",
    attendeeController.deleteOneAttendeeFromOneEvent
  );

module.exports = RouteEvents;
