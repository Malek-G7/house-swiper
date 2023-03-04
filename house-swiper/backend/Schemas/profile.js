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
    lookingFor: {
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
    },
    likedUsers: [{
        type : String
    }],
    matchedUsers:[{
        type : String
    }]
})

module.exports = mongoose.model('profile',profileSchema)