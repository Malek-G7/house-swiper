const express = require("express")
const router = express.Router()
const passport = require('passport');
const Profile = require("../Schemas/profile")

router.patch("/likeProfile",async (req,res)=>{   
    if (req.isAuthenticated()){
            if(req.body.username){
                likedProfile = await Profile.findOne({username: new RegExp('^'+req.body.username+'$', "i")});
                console.log(likedProfile)
                const profile = await Profile.findByIdAndUpdate(req.session.passport.user,
                    { "$addToSet": { "likedUsers": likedProfile._id } },
                    { "new": true, "upsert": true },
                );
                if(likedProfile.likedUsers.includes(profile._id)){
                    await Profile.findByIdAndUpdate(req.session.passport.user,
                        { "$addToSet": { "matchedUsers": likedProfile._id } },
                        { "new": true, "upsert": true },
                    );
                    await Profile.findByIdAndUpdate(likedProfile._id,
                        { "$addToSet": { "matchedUsers": profile._id } },
                        { "new": true, "upsert": true },
                    );
                    res.send(req.body.username)
                }
                else{
                    res.send("no match")
                }
            }
    }
    else{
        res.send("not authorized")
    }
})
router.delete("/unmatch",async (req,res)=>{
    
})
module.exports = router 