const express = require("express")
const mongoose = require("mongoose")
const profilesRouter = require("./routes/profiles")
const matchingRouter = require("./routes/matching")
const messagingRouter = require("./routes/messaging")
const session = require('express-session');
const passport = require('passport');
const cors = require("cors")
const app = express()
const cookieParser = require("cookie-parser")
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const dotenv = require("dotenv")
dotenv.config()

mongoose.connect(
    process.env.DB_URI,
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

app.use(cors({
    origin : "http://localhost:3000",
    credentials:  true
}))

app.use(session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: true,
    // store: db,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));
app.use((req, res, next) => {
    console.log(req.session);
    next();
});
app.use(cookieParser("secretcode"))

require('./auth/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use("/profiles",profilesRouter)
app.use("/matching",matchingRouter)
app.use("/messaging",messagingRouter)

app.get("/",(req,res) => {
    res.send("hello world")
   
})
// revisit later

app.listen(5000,'0.0.0.0', () => {
    console.log("server started on port 5000 !")
})