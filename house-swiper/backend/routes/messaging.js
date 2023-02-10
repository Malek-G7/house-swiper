const express = require("express")
const router = express.Router()
const Profile = require("../Schemas/profile")

router.post("/sendChat", async (req,res)=>{
    if (req.isAuthenticated()){
        const user = await Profile.findOne({ _id: [req.session.passport.user] }) 
        console.log(user.username + " sent this message to " + req.body.talkingTo + " : " + req.body.message)
        res.send("ok")
    }
    else{
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }
})

router.get("/getAllChats",async (req,res)=>{
    
})

module.exports = router 
