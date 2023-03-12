const mongoose = require('mongoose');

const AttendeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    eventsIds : [{
        type: String
    }]
})

module.exports = mongoose.model('Attendee', AttendeeSchema);