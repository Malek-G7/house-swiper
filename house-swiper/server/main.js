const express = require("express")
const app = express();

app.get('/', (req,res) => {
    res.status(200).send("Helloooo World!")
})

app.listen(5000, () => console.log('app listening on port 5000!'));