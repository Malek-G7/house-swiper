const express = require("express")
const router = express.Router()
const Profile = require("../Schemas/profile")
/* Multer adds a body object and a file or files object to the request object. The body object contains the values of the text fields of the form,
 the file or files object contains the files uploaded via the form.*/ 
const multer = require ("multer")
const { S3Client } = require("@aws-sdk/client-s3")
const { PutObjectCommand ,GetObjectCommand, DeleteObjectCommand} = require("@aws-sdk/client-s3")
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner")
const dotenv = require("dotenv").config
const crypto = require("crypto")
const sharp = require("sharp")
const storage = multer.memoryStorage()
/* Multer accepts an options object, the most basic of which is the dest property, which tells Multer where to upload the files. In case you omit the options object, the files will be kept in memory and never written to disk.*/ 
const upload = multer({ storage: storage })
const cors = require("cors")
const passport = require('passport');

const isAuth = require('./authMiddleWare').isAuth;
const isAdmin = require('./authMiddleWare').isAdmin;
router.use(cors({origin : "*"}))

router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
// Accept a single file with the name fieldname. The single file will be stored in req.file.
upload.single("image")

const bucketName = 'house-swiper'
const bucketRegion = 'eu-west-1'
const accessKey =  ''
const secretAccessKey = ''

const s3 = new S3Client({
    credentials:{
        accessKeyId:accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion 
})

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

router.post('/login', passport.authenticate('local', { failureRedirect: '/profiles/login-failure', successRedirect: '/profiles/login-success' }));

router.post('/register', async (req, res, next) => {
    const saltHash = genPassword(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const profile = new Profile({
        email: "",
        password:req.body.password,
        username: req.body.username,
        age: "",
        gender:"",
        occupation:"",
        purpose:"",
        description:"",
        image:"",
        hash: hash,
        salt: salt,
    })
    try {
        const newProfile = await profile.save()
        //res.status(201).json(newProfile)
        res.redirect('/profiles/login');
    } catch (error) {
        res.status(400).json({
            message : error.message
        })
    }
 });

 router.get('/test', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="http://localhost:5000/profiles/register">register</a></p>');
});
router.get('/login', (req, res, next) => {
   
    const form = '<h1>Login Page</h1><form method="POST" action="/profiles/login">\
    Enter Username:<br><input type="text" name="username">\
    <br>Enter Password:<br><input type="text" name="password">\
    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);

});
router.get('/register', (req, res, next) => {

    const form = '<h1>Register Page</h1><form method="post" action="http://localhost:5000/profiles/register">\
                    Enter Username:<br><input type="text" name="username">\
                    <br>Enter Password:<br><input type="text" name="password">\
                    <br><br><input type="submit" value="Submit"></form>';

    res.send(form);
    
});

router.get('/protected-route',  (req, res, next) => {
    if (req.isAuthenticated()) {
        res.send("you made it to the protected route")
    } else {
        res.status(401).json({ msg: 'You are not authorized to view this resource' });
    }
});

router.get('/logout', (req, res, next) => {
    req.logout(function(err){
        if(err){ return next(err)}
        res.redirect('/profiles/protected-route');
    });
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/profiles/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});




router.get('/', async (req,res) => {
   try {
    const getAllProfiles = await Profile.find()

    for(const profile of getAllProfiles){
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
    // console.log(getAllProfiles)
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

router.post('/', upload.single("image") , async (req,res) => {

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
    const profile = new Profile({
        email: req.body.email,
        password:req.body.password,
        name: req.body.name,
        age: req.body.age,
        gender:req.body.gender,
        occupation:req.body.occupation,
        purpose:req.body.purpose,
        description:req.body.description,
        image:imageName
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
            message : err.message
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

module.exports = router 