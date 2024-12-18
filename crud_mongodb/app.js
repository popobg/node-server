const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./app/router/userRouter");

const app = express();
app.use(userRouter);

const PORT = 3000;
// http://localhost:3000/
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

// "mongodb://127.0.0.1:27017/node-users" pour se connecter sur une db en localhost
// (visualisable avec MongoDB Compass par exemple)
mongoose.connect("mongodb+srv://admin:root@cluster0.v4kii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("Connected"))
.catch((err) => console.log({message: "Unable to connect", err}));

// global middleware: 404 route not found
app.use((req, res) =>{
    setTimeout(() => {
        console.log("Après 2 secondes...");
        res.status(404).json({error: "Route not found."});
    }, 2000);
});

// global middleware: 500 server error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: "Internal server error."});
});