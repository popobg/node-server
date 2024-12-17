const objUsers = require("../model/User");
let users = objUsers.users;
let maxId = objUsers.maxId;

const controller = {};

// GET ALL
controller.findAll = (req, res) => {
    let page = req.query.page;
    let limit = req.query.limit;

    // default = 1
    page = parseInt(page) || 1;
    // default = 5
    limit = parseInt(limit) || 5;

    if (page <= 0) {
        return res.status(400).json({error: "The page must be a positive integer."});
    }

    if (limit <= 0) {
        return res.status(400).json({error: "The limit must be a positive integer."});
    }

    // page - 1 car index débute à 0
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    let totalPages = users.length / limit;
    // si totalPages est un nombre décimal
    if (totalPages % 1 !== 0) {
        totalPages = Math.floor(totalPages) + 1;
    }

    const result = {
        totalPages: totalPages,
        currentPAge : page,
        limit: limit,
        links: {
            previous: `http://localhost:3000/users?page=${page-1}&limit=${limit}`,
            current: `http://localhost:3000/users?page=${page}&limit=${limit}`,
            next: `http://localhost:3000/users?page=${page+1}&limit=${limit}`
        },
        data: users.slice(startIndex, endIndex)
    };

    res.json(result);
};

// GET BY NAME
controller.findByName = (req, res) => {
    if(req.query.name !== undefined) {
        const queryName = req.query.name.toLowerCase();

        let requestedUsers = users.filter((u) => u.name.toLowerCase() == queryName);

        res.status(200).send(requestedUsers);
        return;
    }

    res.status(404).json({error: "No query."});
};

// GET BY ID
controller.findById = (req, res) => {
    const user = users.find((u) => u.id == req.params.id);

    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({message: "User not found."});
    }
};

// POST = ajouter des données
controller.add = (req, res) => {
    const {name, age} = req.body;
    maxId++;

    const user = {id: maxId, name, age};
    users.push(user);

    res.status(201).json({user, message: "User created successfully."});
};

// PUT/PATCH = modifier des données
controller.update = (req, res) => {
    const {name, age} = req.body;
    const id = parseInt(req.params.id);

    const user = {id, name, age};

    // On retire le précédent utilisateur et on le rajoute une fois les modifications effectuées (même id)
    users = users.filter((u) => u.id !== id);
    users.push(user);

    res.status(200).json({ message: "User updated successfully."});
};

// DELETE = supprimer des données
controller.delete = (req, res) => {
    users = users.filter((u) => u.id != req.params.id);
    res.status(200).json({ message: "User deleted successfully."});
};

controller.testMiddleware = (req, res) => {
    return res.send("Middleware checked.");
}

module.exports = controller;