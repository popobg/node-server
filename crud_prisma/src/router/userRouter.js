const express = require("express");
const controller = require("../controller/userController");
const middlewares = require("../middleware/middleware");

const router = express.Router();

router.get("/users", controller.findAll);
router.get("/users/search", controller.findByName);
router.get("/users/:id", controller.findById);
router.post("/users", [middlewares.nameIsValid, middlewares.ageIsValid], controller.addUser);
router.put("/users/:id", [middlewares.nameIsValid, middlewares.ageIsValid], controller.updateUser);
router.delete("/users/:id", controller.deleteUser);

module.exports = router;