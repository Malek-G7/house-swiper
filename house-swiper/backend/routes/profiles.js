const express = require("express")
const router = express.Router()
const Profile = require("../Schemas/profile")
/* Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form,
 the file or files object contains the files uploaded via the form.*/ 
const multer = require ("multer")
const { S3Client } = require("@aws-sdk/client-s3")
const { PutObjectCommand ,GetObjectCommand, DeleteObjectCommand} = require("@aws-sdk/client-s3")
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner")
const dotenv = require("dotenv")
dotenv.config()
const crypto = require("crypto")
const sharp = require("sharp")
const storage = multer.memoryStorage()
/* Multer accepts an options object, the most basic of which is the dest property, which tells Multer where to upload the files. In case you omit the options object, the files will be kept in memory and never written to disk.*/ 
const upload = multer({ storage: storage })
const cors = require("cors")
const passport = require('passport');



router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
// Accept a single file with the name fieldname. The single file will be stored in req.file.
upload.single("image")

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey =  process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials:{
        accessKeyId:accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion 
})

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

// router.post('/login', passport.authenticate('local', { failureRedirect: '/profiles/', successRedirect: 'http://localhost:5000/profiles/' }));
router.post("/login", (req, res, next) => {
    console.log("works here login")
    console.log(req.body)
    passport.authenticate("local", (err, user) => {
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        req.logIn(user, async (err) => {
            const location = {
                lat : req.body.lat,
                long : req.body.long
            }
            await Profile.findByIdAndUpdate(req.session.passport.user,
                { "$set": { "location": location } },
                { "new": true, "upsert": true },
            );
            res.status(200).json({ msg: 'success from server' + req.isAuthenticated()});
        });
    })(req, res);
  });


router.delete('/logout', (req, res, next) => {
    req.logout(function(err){
        if(err){ return next(err)}
        req.session.destroy(function (err) {
            if (err) { return next(err); }
            // The response should indicate that the user is no longer authenticated.
            return res.send({ authenticated: req.isAuthenticated() });
          });
    });

});

router.get('/', async (req,res) => {
    if (req.isAuthenticated()) {
        try {
            let getAllProfiles = await Profile.find({ _id: { $nin: [req.session.passport.user] } }) // returns all profile except current user 
            const user = await Profile.findOne({ _id: [req.session.passport.user] }) 
            for(const profile of getAllProfiles){
                if(profile.lookingFor== user.lookingFor){
                    getAllProfiles = getAllProfiles.filter(filteredProfiles => filteredProfiles._id != profile._id );
                }
                for(const likedUserID of user.likedUsers){
                    if(profile. _id.toHexString()==likedUserID){
                        getAllProfiles = getAllProfiles.filter(filteredProfiles => filteredProfiles._id != likedUserID );
                    }
                }
                const maxRadius = user.locationFilter
                const distance = getDistanceFromLatLonInKm(user.location.lat,user.location.long,profile.location.lat,profile.location.long)
                if(maxRadius && distance){
                    if(distance>maxRadius){
                        getAllProfiles = getAllProfiles.filter(filteredProfiles => filteredProfiles._id != profile._id );
                    }
                }
                if(profile.image){
                    const getObjectParams = {
                        Bucket: bucketName,
                        Key : profile.image
                    } 
                    const command = new GetObjectCommand(getObjectParams)
                    const url = await getSignedUrl(s3,command)
                    profile.image = url
                }
            }
            res.json(getAllProfiles)
           } catch(err){
            res.status(500).json(
                {message: err.message 
            })
           }
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }
     
})

router.get("/isSignedIn",async (req,res,next)=>{
    if(req.isAuthenticated()){
        res.status(200).json({ msg: 'You are signed in' });
    }
    else {
        res.status(401).json({ msg: 'You are not signed in' });
    }
})

router.get("/getEditProfileDetails",async (req,res,next)=>{
    if(req.isAuthenticated()){
        const profile = await Profile.findOne({ _id: [req.session.passport.user] }) 
        const getObjectParams = {
            Bucket: bucketName,
            Key : profile.image
        } 
        const command = new GetObjectCommand(getObjectParams)
        const url = await getSignedUrl(s3,command)
        profile.image = url
        console.log("user is "+ profile)
        res.send(profile);
    }
})
router.post("/setLocationFilter",async (req,res,next)=>{
    if (req.isAuthenticated()){
        console.log(req.body.radius)
        await Profile.findOneAndUpdate({ _id: [req.session.passport.user] },{locationFilter:req.body.radius}) 
        res.sendStatus(200)
    }
})
router.get('/matches', async(req,res) => {
    if (req.isAuthenticated()){
        const user = await Profile.findOne({ _id: [req.session.passport.user] }) 
        //console.log(user.matchedUsers)
        matchedUsersID = user.matchedUsers
        const matchedProfiles = []
        for(const matchID of matchedUsersID){
            const MatchedUser = await Profile.findOne({ _id: matchID }) 
            if(MatchedUser.image){
                const getObjectParams = {
                    Bucket: bucketName,
                    Key : MatchedUser.image
                } 
                const command = new GetObjectCommand(getObjectParams)
                const url = await getSignedUrl(s3,command)
                MatchedUser.image = url
            }
            matchedProfiles.push(MatchedUser)
        }
        res.json(matchedProfiles)
    }
    else {
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }
})

router.get('/:id',getProfile,(req,res) => {
    res.send(res.profile)
})

router.patch('/submitNewProfile',upload.single("image"),async (req,res)=>{
    if(req.isAuthenticated()){
        const user = await Profile.findOne({ _id: [req.session.passport.user] }) 
        const oldImageName = user.image
        const buffer = await sharp(req.file.buffer).resize({height: 500, width : 750, fit :"fill"}).toBuffer()
        const imageName = randomImageName()
        const params = {
            Bucket : bucketName,
           // Key: req.file.originalname,
            Key: imageName,
            Body : buffer,
            ContentType: req.file.mimetype
        }
        const command = new PutObjectCommand(params)
        s3.send(command)

        const newProfile = await Profile.findByIdAndUpdate({ _id: [req.session.passport.user] },{image : imageName, description : req.body.bio})
        deleteParams = {
            Bucket : bucketName,
            Key : oldImageName,
        }
        const deleteImageCommand = new DeleteObjectCommand(deleteParams)
        s3.send(deleteImageCommand)

        res.sendStatus(200)
    }
    else {
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }
})

router.post('/register', upload.single("image") , async (req,res) => {
    const buffer = await sharp(req.file.buffer).resize({height: 500, width : 750, fit :"fill"}).toBuffer()
    
    const imageName = randomImageName()
    const params = {
        Bucket : bucketName,
       // Key: req.file.originalname,
        Key: imageName,
        Body : buffer,
        ContentType: req.file.mimetype
    }

    const command = new PutObjectCommand(params)
    s3.send(command)

    const saltHash = genPassword(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const coord = {
        lat : req.body.lat,
        long: req.body.long
    }
    const profile = new Profile({
        email: req.body.email,
        password:req.body.password,
        username: req.body.username,
        age: req.body.age,
        gender:req.body.gender,
        occupation:req.body.occupation,
        lookingFor:req.body.lookingFor,
        description:req.body.description,
        image:imageName,
        hash: hash,
        salt: salt,
        location : coord
    })
    try {
        const newProfile = await profile.save()
        req.logIn(newProfile, async (err) => {
            
        });
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(400).json({
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
    if(req.body.lookingFor != null){
        res.profile.lookingFor = req.body.lookingFor
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
            message : "deleted profile"
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
                    message:"cannot find profile"
                })
            }
        }
     catch (error) {
        res.send(500).json({
            message : error.message
        })
    }
    res.profile = profile
    next()
}
function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    
    return {
      salt: salt,
      hash: genHash
    };
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }
module.exports = router 