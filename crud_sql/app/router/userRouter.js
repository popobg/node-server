const express = require("express");
const controller = require("../controller/userController");
const middlewares = require("../middleware/middlewares");

const router = express.Router();

router.get("/users", controller.findAll);
router.get("/users/search", controller.findByName);
router.get("/users/:id", controller.findById);
router.post("/users/create", [middlewares.nameIsValid, middlewares.ageIsValid], controller.add);
router.put("/users/update/:id", [middlewares.nameIsValid, middlewares.ageIsValid], controller.update);
router.delete("/users/delete/:id", controller.delete);

module.exports = router;