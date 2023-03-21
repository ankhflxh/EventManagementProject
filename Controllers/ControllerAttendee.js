const Client = require('../Models/Client');
const Attendee = require('../Models/Attendee');
const Event = require('../Models/Event');
const SendEmail = require('../NodeMailer/Email')
const bcrypt = require('bcrypt');

exports.CreateAttendee = async(req, res) => {
    const attendee = await Attendee.create({
        name : req.body.name, 
        email : req.body.email,
    
    })
    res.send(attendee)
}
exports.GetTheAttendees = async(req, res) => {
    const attendees = await Attendee.find({})
    res.send(attendees)
}
 exports.GetOneAttendee = async(req, res) => {
    const id = req.params.id
     const attendee = await Attendee.findOne({
        _id : id
     })
     res.json(attendee)
}
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
        const lookEvent = await Event.findOne({_id: req.params.eventId});
        if(!lookEvent) return res.status(404).json({message: `Event with id '${req.params.eventId}' not found`});

        const {name, email} = req.body;
        if(!name ||!email){
            return res.status(400).json({"error": "PLEASE !!!Attendee must have a name and email"});
        }

        // if the attendee exists
        const lookAttendee = await Attendee.findOne({email});

        if(lookAttendee){
           const event = await Event.findOne({id : req.params.eventId})
            // add the current event id 
        
            lookAttendee.eventsIds.push(req.params.eventId)
            lookAttendee.save();
            const attendee = await Attendee.create({name ,email});
            await  SendEmail(email, subject = 'ADDED TO EVENT', text = `
            Hello, You have been added to this event, please clarify if this is you by following and completing the 
            instructions below. Thank you for complying with us
            yours,My Event Planner`)
            return res.status(201).json({
                "message": "Attendee created successfully!!!",
                attendee: lookAttendee
            })
        }

        // if the attendee does not exist before
        
        

        // increase the attendees count in event
        // lookEvent.attendeesCount++;
         lookEvent.save();

        res.status(201).json({
            "message": "Attendee created successfully",
            //attendee: newAttendee
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.getAttendeesOfOneEvent = async (req, res) => {
    try {
        //find the event
        const lookEvent = await Event.findOne({_id: req.params.eventId});
        if(!lookEvent) return res.status(404).json({message: `Event with id '${req.params.eventId}' not found`});

        // get all attendeess
        const allAttendees = await Attendee.find({});

        res.json({
            event: lookEvent.name,
            attendees: allAttendees.filter(attendee => attendee.eventsIds.includes(lookEvent._id))

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
        const lookEvent = await Event.findOne({_id: req.params.eventId});
        if(!lookEvent) return res.status(404).json({message: `Event with id '${req.params.eventId}' not found`});

        // get all attendeess
        const lookAttendee = await Attendee.findOne({_id: attendeeId});
        if(!lookAttendee) return res.status(404).json({message: `Attendee with id '${attendeeId}' not found`});

        if(!lookAttendee.eventsIds.includes(eventId)){
            return res.json({message: `Attendee with id '${attendeeId}' is not going for event "${eventId}"`});
        }

        res.json({
            event: lookEvent.name,
            attendee: lookAttendee
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
        const lookEvent = await Event.findOne({_id: eventId});
        if(!lookEvent) return res.status(404).json({message: `Event with id '${req.params.eventId}' not found`});

        //find the attendee and confirm if he is attending that event
        const lookAttendee = await Attendee.findOne({_id: attendeeId});
        if( lookAttendee) return res.status(404).json({message: `Attendee with id '${attendeeId}' not found`});

        if( lookAttendee.eventsIds.includes(eventId)){
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
        const lookEvent = await Event.findOne({_id: eventId});
        if(!lookEvent) return res.status(404).json({message: `Event with id '${req.params.eventId}' not found`});

        //find the attendee and confirm if he is attending that event
        let lookAttendee = await Attendee.findById(attendeeId);
        if( lookAttendee) return res.status(404).json({message: `Attendee with id '${attendeeId}' not found`});

        if( lookAttendee.eventsIds.includes(eventId)){
            return res.json({message: `Attendee with id '${attendeeId}' is not going for event '${eventId}'`});
        }

        //delete attendee from that event
     lookAttendee.eventsIds = lookAttendee.eventsIds.map(oneEventId => oneEventId !== eventId)
     
     const attendee = await Attendee.create({name ,email});
     await  SendEmail(email, subject = 'REMOVED FROM TO EVENT', text = `
     Hello, You have been removed to this event, please clarify if this is you by following and completing the 
     instructions below. Thank you for complying with us
     Yours,
     My Event Planner`)

        // decrease the attendees count in event
        lookEvent.attendeesCount--;
        lookEvent.save();

        res.json({
            message: "Attendee successfully removed from event"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}