const Attendee = require('../models/Attendee');
const Event = require('../models/Event');

exports.getAllAttendees = async(req, res) => {
    try {
        const attendees = await Attendee.find({});
        res.json(attendees);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.createAttendeeForEvent = async (req, res) => {
    try {
        //find the event
        const LookEvent = await Event.findOne({_id: req.params.eventId});
        if(!LookEvent) return res.status(404).json({message: `Event with id '${req.params.eventId}' not found`});

        const {name, email} = req.body;
        if(!name ||!email){
            return res.status(400).json({"error": "PLEASE !!!Attendee must have a name and email"});
        }

        // if the attendee exists
        const LookAttendee = await Attendee.findOne({email});
        if(LookAttendee){
            // add the current event id 
            console.log()
            LookAttendee.eventsIds.push(req.params.eventId)
            LookAttendee.save();

            return res.status(201).json({
                "message": "Attendee created successfully!!!",
                attendee: LookAttendee
            })
        }

        // if the attendee does not exist before
        const newAttendee = await Attendee.create({
            name,
            email, 
            eventsIds: [LookEvent._id]
        });

        // increase the attendees count in event
        LookEvent.attendeesCount++;
        LookEvent.save();

        res.status(201).json({
            "message": "Attendee created successfully",
            attendee: newAttendee
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.getAttendeesOfOneEvent = async (req, res) => {
    try {
        //find the event
        const LookEvent = await Event.findOne({_id: req.params.eventId});
        if(!LookEvent) return res.status(404).json({message: `Event with id '${req.params.eventId}' not found`});

        // get all attendeess
        const allAttendees = await Attendee.find({});

        res.json({
            event: LookEvent.name,
            attendees: allAttendees.filter(attendee => attendee.eventsIds.includes(LookEvent._id))

        })       
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.getOneAttendeeInOneEvent = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const attendeeId = req.params.attendeeId;

        //find the event
        const LookEvent = await Event.findOne({_id: req.params.eventId});
        if(!LookEvent) return res.status(404).json({message: `Event with id '${req.params.eventId}' not found`});

        // get all attendeess
        const LookAttendee = await Attendee.findOne({_id: attendeeId});
        if(!LookAttendee) return res.status(404).json({message: `Attendee with id '${attendeeId}' not found`});

        if(!LookAttendee.eventsIds.includes(eventId)){
            return res.json({message: `Attendee with id '${attendeeId}' is not going for event "${eventId}"`});
        }

        res.json({
            event: LookEvent.name,
            attendee: LookAttendee
        })

         
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.editOneAttendeeForOneEvent = async(req, res) => {
    try {
        const {eventId, attendeeId} = req.params;

        //find the event
        const LookEvent = await Event.findOne({_id: eventId});
        if(!LookEvent) return res.status(404).json({message: `Event with id '${req.params.eventId}' not found`});

        //find the attendee and confirm if he is attending that event
        const LookAttendee = await Attendee.findOne({_id: attendeeId});
        if(!LookAttendee) return res.status(404).json({message: `Attendee with id '${attendeeId}' not found`});

        if(!LookAttendee.eventsIds.includes(eventId)){
            return res.json({message: `Attendee with id '${attendeeId}' is not going for event '${eventId}'`});
        }

        //update the details of the attendee
        if(!req.body) return res.status(400).json({message: "Update content can not be empty"});
        const updatedAttendee = await Attendee.findOneAndUpdate({_id: attendeeId}, req.body);

        res.json({
            message: "Attendee info updated successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.deleteOneAttendeeFromOneEvent = async(req, res) => {
    try {
        const {eventId, attendeeId} = req.params;

        //find the event
        const LookEvent = await Event.findOne({_id: eventId});
        if(!LookEvent) return res.status(404).json({message: `Event with id '${req.params.eventId}' not found`});

        //find the attendee and confirm if he is attending that event
        let LookAttendee = await Attendee.findById(attendeeId);
        if(!LookAttendee) return res.status(404).json({message: `Attendee with id '${attendeeId}' not found`});

        if(!LookAttendee.eventsIds.includes(eventId)){
            return res.json({message: `Attendee with id '${attendeeId}' is not going for event '${eventId}'`});
        }

        //delete attendee from that event
        LookAttendee.eventsIds = LookAttendee.eventsIds.map(oneEventId => oneEventId !== eventId)
        LookAttendee.save();

        // decrease the attendees count in event
        LookEvent.attendeesCount--;
        LookEvent.save();

        res.json({
            message: "Attendee successfully removed from event"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}