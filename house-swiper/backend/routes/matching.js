const express = require("express")
const router = express.Router()
const passport = require('passport');
const Profile = require("../Schemas/profile")

router.patch("/likeProfile",async (req,res)=>{   
    if (req.isAuthenticated()){
            if(req.body.username){
                likedProfile = await Profile.findOne({username: new RegExp('^'+req.body.username+'$', "i")});
                console.log(likedProfile)
                // find current user by id then add liked user to current  users liked users list
                const profile = await Profile.findByIdAndUpdate(req.session.passport.user,
                    { "$addToSet": { "likedUsers": likedProfile._id } },
                    { "new": true, "upsert": true },
                );
                // if liked user has already previously liked current user its a match and add both users to each others matched user list
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

router.patch("/unmatch",async (req,res)=>{   
    if (req.isAuthenticated()){
        if(req.body.username){
            unmatchedProfile = await Profile.findOne({username: new RegExp('^'+req.body.username+'$', "i")});
            currentUser =  await Profile.findOne({_id: req.session.passport.user});
            console.log(unmatchedProfile)
            console.log(currentUser)
            // remove unmatched users from current users liked and matched userlist
            await Profile.findByIdAndUpdate(currentUser._id,
                { "$pull": { "matchedUsers": unmatchedProfile._id } },
                { "new": true, "upsert": true },
            );
            await Profile.findByIdAndUpdate(currentUser._id,
                { "$pull": { "likedUsers": unmatchedProfile._id } },
                { "new": true, "upsert": true },
            );
            // remove current user from unatched users liked and matched userlist
            await Profile.findByIdAndUpdate(unmatchedProfile._id,
                { "$pull": { "matchedUsers": currentUser._id } },
                { "new": true, "upsert": true },
            );
            await Profile.findByIdAndUpdate(unmatchedProfile._id,
                { "$pull": { "likedUsers": currentUser._id } },
                { "new": true, "upsert": true },
            );
        }
        res.send("success")
    }
    else{
        res.send("not authorized")
    }
})

module.exports = router 