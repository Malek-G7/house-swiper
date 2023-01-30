const express = require("express")
const router = express.Router()
const passport = require('passport');
const Profile = require("../Schemas/profile")



router.post("/test",async (req,res)=>{
   
    if (req.isAuthenticated()){
        const profile = await Profile.findById(req.session.passport.user)
        if(profile){
            if(req.body.username){
                x = await Profile.findOne({username: new RegExp('^'+req.body.username+'$', "i")});
                console.log(profile)
                console.log(x)
            }
            else{
                console.log(profile)
            }
        }
        
        else {
            console.log("no profile found")}
    }
    else{
        console.log("doesnt work")
    }
    res.send(" ")

})
module.exports = router 