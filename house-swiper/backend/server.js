const express = require("express")
const app = express()
const mongoose = require("mongoose")
const profilesRouter = require("./routes/profiles")


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

app.listen(5000, () => {
    console.log("server started on port 5000 !")
})