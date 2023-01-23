const express = require("express")
const mongoose = require("mongoose")
const profilesRouter = require("./routes/profiles")
const session = require('express-session');
const passport = require('passport');
const cors = require("cors")
const app = express()


app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

app.use(session({
    secret: "sufhsfjksdfhkjfewr",
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

require('./auth/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use("/profiles",profilesRouter)
app.get("/",(req,res) => {
    res.send("hello world")
   
})
// revisit later
app.use(cors({origin : "*"}))

app.listen(5000, () => {
    console.log("server started on port 5000 !")
})