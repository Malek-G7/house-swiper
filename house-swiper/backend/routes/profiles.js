const express = require("express")
const router = express.Router()
const Profile = require("../Schemas/profile")

router.get('/', async (req,res) => {
   try {
    const getAllProfiles = await Profile.find()
    res.json(getAllProfiles)
   } catch(err){
    res.status(500).json(
        {message: err.message 
    })
   }
})

router.get('/:id',getProfile,(req,res) => {
    res.send(res.profile)
})

router.post('/', async (req,res) => {
    const profile = new Profile({
        email: req.body.email,
        password:req.body.password,
        name: req.body.name,
        age: req.body.age,
        gender:req.body.gender,
        occupation:req.body.occupation,
        purpose:req.body.purpose,
        description:req.body.description,
        image:req.body.image
    })
    try {
        const newProfile = await profile.save()
        res.status(201).json(newProfile)
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
})

router.patch('/', getProfile ,async (req,res) =>{
    if(req.body.name != null){
        res.profile.name = req.body.name
    }
    if(req.body.age != null){
        res.profile.age = req.body.age
    }
    if(req.body.email != null){
        res.profile.email = req.body.email
    }
    if(req.body.password != null){
        res.profile.password = req.body.password
    }
    if(req.body.gender != null){
        res.profile.gender = req.body.gender
    }
    if(req.body.occupation != null){
        res.profile.occupation = req.body.occupation
    }
    if(req.body.image != null){
        res.profile.image = req.body.image
    }
    if(req.body.purpose != null){
        res.profile.purpose = req.body.purpose
    }
    if(req.body.description != null){
        res.profile.description = req.body.description
    }

    try{
        const updatedProfile = await res.profile.save()
        res.json({
            updatedProfile
        })
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
})

router.delete('/:id',getProfile, async (req,res) =>{
    try{
        await res.profile.remove()
        res.json({
            message : "deleted subscirber"
        })
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
})

async function getProfile(req,res,next){
    try {
        const profile = await Profile.findById(req.params.id) 
            if(profile == null){
                return res.status(404).json({
                    message:"cannot find subscriber"
                })
            }
        }
     catch (error) {
        res.send(500).json({
            message : err.message
        })
    }
    res.profile = profile
    next()
}


module.exports = router 