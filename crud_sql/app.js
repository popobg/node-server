const express = require("express");
const cors = require("cors");
const userRouter = require("./app/router/userRouter");
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(userRouter);

// Start the server
const PORT = 3000;
// http://localhost:3000/
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

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