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

module.exports = router;