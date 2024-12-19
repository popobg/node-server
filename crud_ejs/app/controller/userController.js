const users = require("../model/User");
const { Op } = require("sequelize");

const controller = {};

// READ
controller.findAll = async (req, res) => {
    try {
        const allUsers = await users.findAll();
        res.render("index", {allUsers});
    }
    catch (error) {
        res.sender("error/error", {message : error.message});
    }
};

controller.findById = async (req, res) => {
    const user = await users.findByPk(parseInt(req.params.id));
    res.render("user/details", {user});
};

// CREATE
controller.getCreatePage = (req, res) => {
    res.render("user/create");
}

controller.add = async (req, res) => {
    const newUser = await users.create(
        {
            name: req.body.name,
            age: req.body.age
        }
    );

    if (newUser) {
        console.log("User created successfully");
        res.redirect("/users");
    }
    else {
        res.render("error/error", { message: "Failed to create new user" });
    }
};

// UPDATE
controller.getUpdatePage = async (req, res) => {
    const user = await users.findByPk(parseInt(req.params.id));
    res.render("user/update", {user});
}

controller.update = async (req, res) => {
    const { name, age } = req.body;
    const id = parseInt(req.params.id);

    const user = await users.update(
        { name: name, age: age },
        { where: { id: id } }
    )

    if (user) {
        res.redirect(`/users/${id}`);
    }
    else {
        res.render("error/error", { message: "Failed to update user." });
    }
};

// DELETE
controller.delete = async (req, res) => {
    const user = await users.destroy({
        where: { id: parseInt(req.params.id) }
    });

    if (user) {
        console.log("user deleted");
        return res.status(200).send();
    }
    else {
        return res.status(400).send();
    }
};

module.exports = controller;