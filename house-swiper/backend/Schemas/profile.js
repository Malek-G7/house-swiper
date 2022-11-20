const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    }, 
    gender: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required : true
    },
    image: {
        type: String,
        required : true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('profile',profileSchema)