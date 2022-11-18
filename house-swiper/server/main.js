const express = require("express")
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const uri = "mongodb+srv://malek7:<password>@houseswiper.oyq4unw.mongodb.net/?retryWrites=true&w=majority";

app.get('/', (req,res) => {
    res.status(200).send({ text : "Helloooo World woooooohoooooooooo!"} )
})



app.post('/', (req,res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    client.connect(err => {
        const collection = client.db("test").collection("profiles").insertOne(req.body);
        client.close();
    });
})

app.listen(5000, () => console.log('app listening on port 5000!'));
