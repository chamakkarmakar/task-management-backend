const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Task Management is working");
});

app.listen(port, (req, res) => {
    console.log("App is listening on port :", port);
});