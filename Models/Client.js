const mongoose = require('mongoose')
const {ADMIN,CLIENT} = require('../data');
const validator = require('validator');

const ClientSchema = new mongoose.Schema({
    name:{
       type: String
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email')
            }
        }
    }, 
    password:{
        type: String,
        required: true
    },
    role: {
        type : String,
        enum: [ADMIN,CLIENT],
        required: true
    }
})

module.exports = mongoose.model('Client', ClientSchema);