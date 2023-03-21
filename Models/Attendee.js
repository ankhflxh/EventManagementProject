const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const AttendeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    eventIds : [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Event'
    }]
})

module.exports = mongoose.model('Attendee', AttendeeSchema);