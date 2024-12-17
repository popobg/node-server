const express = require("express");
const app = express();
const userRouter = require("./app/router/userRouter");

app.use(express.json());
app.use(userRouter);

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

// Start the server
const PORT = 3000;
// http://localhost:3000/
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

