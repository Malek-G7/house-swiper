const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: false
    },
    age: {
        type: String,
        required: false
    }, 
    gender: {
        type: String,
        required: false
    },
    occupation: {
        type: String,
        required: false
    },
    purpose: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required : false
    },
    hash:{
        type: String,
    },
    salt:{
        String
    }
})

module.exports = mongoose.model('profile',profileSchema)