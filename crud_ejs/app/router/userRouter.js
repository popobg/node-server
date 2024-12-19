const express = require("express");
const controller = require("../controller/userController");
const middlewares = require("../middleware/middlewares");

const router = express.Router();

// page index : voir tous les users
router.get("/users", controller.findAll);
// router.get("/users/search", controller.findByName);

// page create : page de formulaire de création d'un user
router.get("/users/create", controller.getCreatePage)
// route d'action créer
router.post("/users/store", [middlewares.nameIsValid, middlewares.ageIsValid], controller.add);

// page details : voir les détails d'un user
router.get("/users/:id", controller.findById);

// page update : page de formulaire de modification d'un user
router.get("/users/update/:id", controller.getUpdatePage);
// route d'action modifier
router.post("/users/update/:id", [middlewares.nameIsValid, middlewares.ageIsValid], controller.update);

// route d'action supprimer
// router.delete("/users/:id", controller.delete);
router.delete("/users/delete/:id", controller.delete);

module.exports = router;