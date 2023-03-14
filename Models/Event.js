const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const EventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }, 
    date:{
        type: Date,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    isDone: {
        type: Boolean,
        default: false
    },
    attendees: [{
        type : mongoose.Schema.Types.ObjectId, 
        ref: 'Attendee'
    }]
})

module.exports = mongoose.model('Event', EventSchema);
