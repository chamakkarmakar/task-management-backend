require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
// xUq4fOH7kMHQQiBs 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.q0axwt3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const tasksDB = client.db("tasksDB");
        const tasksCollection = tasksDB.collection("tasksCollection");

        // get all data 
        app.get("/allTasks", async (req, res) => {
            const tasksData = tasksCollection.find();
            const result = await tasksData.toArray();
            res.send(result);
        });

        // get single data
        app.get("/allTasks/:id", async (req, res) => {
            const id = req.params.id;
            const tasksData = await tasksCollection.findOne({
                _id: new ObjectId(id),
            });
            res.send(tasksData);
        });

        // create data 
        app.post("/allTasks", async (req, res) => {
            const tasksData = req.body;
            const result = await tasksCollection.insertOne(tasksData);
            res.send(result);
        });

        // update data 
        app.patch("/allTasks/:id", async (req, res) => {
            const id = req.params.id;
            const updatedData = req.body;
            const result = await tasksCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedData }
            );
            res.send(result);
        });

        //   delete data
        app.delete("/allTasks/:id", async (req, res) => {
            const id = req.params.id;
            const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        });

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("Task Management is working");
});

app.listen(port, (req, res) => {
    console.log("App is listening on port :", port);
});