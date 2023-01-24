const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    username: {
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
    image: {
        type: String,
    },
    hash:{
        type: String
    },
    salt:{
        type: String
    }
})

module.exports = mongoose.model('profile',profileSchema)