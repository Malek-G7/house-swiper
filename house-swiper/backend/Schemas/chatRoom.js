const mongoose = require("mongoose")

const chatRoomSchema = new mongoose.Schema({
    particapants: [{
        type : String
    }],
    messages:[{
        from : { type: String }, 
        to : { type : String } , 
        message: { type: String }  
    }]

})
module.exports = mongoose.model('chatRoomSchema',chatRoomSchema)