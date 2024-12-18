const express = require("express");
const users = require("./model/User");
const userRouter = require("./router/userRouter");
const app = express();

app.use(express.json());
app.use(userRouter);

// Start the server
const PORT = 3000;
// http://localhost:3000/
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

// On doit utiliser l'asynchronisme pour communiquer avec la db
app.post("/users", (req, res) => {
    const {name, age} = req.body

    const user = {
        name: name,
        age: age
    };

    users.create(user)
    .then((u) => {
        console.log("User created");
        return res.json({message : "User created", user : u});
    });
});

app.get("/users", (req, res) => {
    users.findAll()
    .then((everyUsers) => {
        return res.json({users : everyUsers});
    });
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