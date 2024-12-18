const users = require("../model/User");

const controller = {};

// GET ALL
controller.findAll = (req, res) => {
    users.findAll()
    .then((everyUsers) => {
        return res.status(200).json({users : everyUsers});
    });
};

// GET BY NAME
controller.findByName = (req, res) => {
    if(req.query.name !== undefined) {
        const queryName = req.query.name.toLowerCase();

        users.findAll({
            where : { name: queryName }
        }).then((requestedUsers) => res.status(200).send(requestedUsers));
        return;
    }

    res.status(404).json({error: "No query."});
};

// GET BY ID
controller.findById = (req, res) => {
    users.findAll({
        where : { id: req.params.id }
    }).then((user) => res.status(200).send(user)).catch(() => res.status(404).json({message: "User not found."}));
};

// POST = ajouter des données
controller.add = (req, res) => {
    const {name, age} = req.body

    const user = {
        name: name,
        age: age
    };

    users.create(user)
    .then((u) => {
        console.log("User created successfully");
        return res.json({message : "User created successfully", user : u});
    });
};

// PUT/PATCH = modifier des données
controller.update = (req, res) => {
    const {name, age} = req.body;
    const id = parseInt(req.params.id);

    users.update(
        {name: name, age: age},
        { where : {id: id}}
    ).then(() => res.status(200).json({ message: "User updated successfully."}));
};

// DELETE = supprimer des données
controller.delete = (req, res) => {
    users.destroy({
        where : { id: req.params.id }
    }).then(() => res.status(200).json({message : "User deleted successfully."})).catch(() => res.status(404).json({message: "User not found."}));
};

module.exports = controller;