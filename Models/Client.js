const mongoose = require('mongoose')
const {ADMIN,CLIENT} = require('../data')

const ClientSchema = new mongoose.Schema({
    name:{
       type: String
    },
    email:{
        type: String,
        required: true
    }, 
    password:{
        type: String,
        required: true
    },
    role: {
        type : String,
        enum: [ADMIN,CLIENT] 
    }
})

module.exports = mongoose.model('Client', ClientSchema);