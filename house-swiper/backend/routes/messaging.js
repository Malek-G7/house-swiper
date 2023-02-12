const express = require("express")
const router = express.Router()
const Profile = require("../Schemas/profile")
const chatRoom = require("../Schemas/chatRoom")

router.post("/sendChat", async (req,res)=>{
    if (req.isAuthenticated()){
        const user = await Profile.findOne({ _id: [req.session.passport.user] }) 
        console.log(user.username + " sent this message to " + req.body.talkingTo + " : " + req.body.message)
        let messageDetails = {
            from : user.username,
            to: req.body.talkingTo,
            message : req.body.message
        }
        let room = await chatRoom.findOne({particapants : { $all: [user.username,req.body.talkingTo ]}})
        console.log(room)
        if(room == null || room.length  == 0){
            room = new chatRoom({
                particapants : [user.username,req.body.talkingTo ],
                messages : messageDetails
            })
            await room.save()
            res.send("success")
            return
        }
        await chatRoom.updateOne(room,
        { "$addToSet": { "messages": messageDetails} },
        { "new": true, "upsert": true },)
        res.send("success")
    }
    else{
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }
})

router.get("/getAllChats",async (req,res)=>{
    
})

module.exports = router 
