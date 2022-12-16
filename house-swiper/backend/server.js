const express = require("express")
const mongoose = require("mongoose")
const profilesRouter = require("./routes/profiles")
const cors = require("cors")
const multer = require ("multer")
const { S3Client } = require("@aws-sdk/client-s3")
const { PutObjectCommand } = require("@aws-sdk/client-s3")
const dotenv = require("dotenv").config
const crypto = require("crypto")
const sharp = require("sharp")
const app = express()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

upload.single("image")

const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials:{
        accessKeyId:accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
})

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

mongoose.connect(
    "mongodb+srv://malek7:<password>@houseswiper.oyq4unw.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true
    }
)

const db = mongoose.connection

db.on('error', (error) => {
    console.log(error)
})

db.once('open', () => {
    console.log("connected to database")
})

app.use(express.json())
app.use("/profiles",profilesRouter)
// revisit later
app.use(cors({origin : "*"}))

app.post("/api/posts", upload.single("image") ,async (req,res) => {
    console.log("req body" ,req.body)
    console.log("req file" ,req.file)

    const buffer = await sharp(req.file.buffer).resize({height: 1920, width : 1080, fit :"contain"}).toBuffer();

    req.file.buffer
    const params = {
        Bucket : bucketName,
       // Key: req.file.originalname,
        Key: randomImageName(),
        Body : buffer,
        ContentType: req.file.mimetype
    }
    const command = new PutObjectCommand(params)
    s3.send(command)
    res.send
})

app.delete("/api/posts/:id", async (req,res)=> {
    const id =+req.params.id
    res.send({})
})

app.listen(5000, () => {
    console.log("server started on port 5000 !")
})