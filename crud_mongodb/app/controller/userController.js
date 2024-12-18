const users = require("../model/User");

const controller = {};

// GET ALL
controller.findAll = (req, res) => {
    users.find({})
    .then((users) => res.status(200).json(users))
    .catch(() => res.status(400).json("No user found"));
};

// GET BY NAME
controller.findByName = (req, res) => {
    const queryName = req.query.name.toLowerCase();

    users.find({ name : queryName })
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(404).json({error : "No user found by that name"}));
};

// GET BY ID
controller.findById = (req, res) => {
    users.findById(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch(() => res.status(404).json({error : "User not found by that id"}));
};

// POST = ajouter des données
controller.add = (req, res) => {
    const { name, age } = req.body;

    users.create({name : name, age : age})
    .then((user) => res.status(201).json({user, message : "User created successfully"}))
    .catch(() => res.status(400).json({error : "Unable to update user"}));
};

// PUT/PATCH = modifier des données
controller.update = (req, res) => {
    const { name, age } = req.body;
    const id = parseInt(req.params.id);

    users.findByIdAndUpdate(id, {name : name, age : age})
    .then(() => res.status(200).json({ message: "User updated successfully." }))
    .catch(() => res.status(400).json({error : "Unable to update user"}));
};

// DELETE = supprimer des données
controller.delete = (req, res) => {
    users.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({message : "User deleted successfully"}))
    .catch(() => res.status(400).json({error : "Unable to delete user"}));
};

module.exports = controller;