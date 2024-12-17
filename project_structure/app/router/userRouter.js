const express = require("express");
const controller = require("../controller/userController");
const middlewares = require("../middleware/middlewares");

const router = express.Router();

router.get("/users", controller.findAll);
router.get("/users/search", controller.findByName);
router.get("/users/:id", controller.findById);
router.post("/users", [middlewares.nameIsValid, middlewares.ageIsValid], controller.add);
router.put("/users/:id", [middlewares.nameIsValid, middlewares.ageIsValid], controller.update);
router.delete("/users/:id", controller.delete);

// test middleware
router.get("/test/middleware", middlewares.myMiddleware, controller.testMiddleware);

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

module.exports = router;