const Event = require('../Models/Event');
const Attendee = require('../Models/Attendee');


exports.createEvent = async (req, res) => {
    const {name, date, location, description} = req.body;
    if(!name || !date || !location || !description){
        return res.status(400).json({"error": "Event must has a name, date, location and brief description!!!!"});
    }

    try {
        const newEvent = await Event.create({name, date, location, description, clientId: req.client._doc._id});
        res.status(201).json({"message": "Event created successfully", event: {...newEvent._doc, attendees: []}});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}


exports.getAllEvents =  async (req, res) => {
    try {
        let events = await Event.find({}).populate('attendees', 'name email');
        res.json(events);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.getUserEvent = async (req, res) => {
    try{
        let events = await Event.find({ clientId: req.client._doc._id }).populate('attendees', 'name email');
        if (events === null) {
            res.send("No event have been created");
            return;
        }
        res.json(events);
    }catch (error){ 
        res.status(500).json({ error: error.message });
    }
}

exports.getOneEvent = async (req, res) => {
    try {
        let LookEvent = await Event.findOne({ _id: req.params.eventId, clientId: req.client._doc._id }).populate('attendees', 'name email');
        if(!LookEvent) return res.status(404).json({message: `Event with id '${req.params.eventId}' not found`});
            
        return res.json({LookEvent});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
}

exports.userUpdateEvent = async (req, res) => {
    
}