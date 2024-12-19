const express = require("express");
let ejs = require('ejs');

const app = express();
const userRouter = require("./app/router/userRouter");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/style', express.static('./style'));

app.use(userRouter);

// Start the server
const PORT = 3000;
// http://localhost:3000/
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

// to use static resources
app.use(express.static("public"));

// set the view engine to ejs
app.set("view engine", "ejs");
// dossier contenant les views
app.set("views", "./app/views");

// // global middleware: 404 route not found
// app.use((req, res) =>{
//     res.render("app/views/error/error", {error: "Route not found."});
// });

// // global middleware: 500 server error
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).render("app/views/error/error", {error: "Internal server error"});
// });