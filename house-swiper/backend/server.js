const express = require("express")
const mongoose = require("mongoose")
const profilesRouter = require("./routes/profiles")
const cors = require("cors")
const app = express()

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

app.listen(5000, () => {
    console.log("server started on port 5000 !")
})