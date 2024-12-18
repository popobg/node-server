const users = require("../model/User");

const controller = {};

// GET ALL
controller.findAll = async (req, res) => {
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

    const userCount = await users.countDocuments();
    let totalPages = userCount / limit;

    if (totalPages % 1 !== 0) {
        totalPages = Math.floor(totalPages) + 1;
    }

    const requestedUsers = await users.find().limit(limit).skip((page - 1) * limit);

    return res.status(200).json({
        totalPages: totalPages,
        currentPage : page,
        limit: limit,
        links: {
            previous: `http://localhost:3000/users?page=${page-1}&limit=${limit}`,
            current: `http://localhost:3000/users?page=${page}&limit=${limit}`,
            next: `http://localhost:3000/users?page=${page+1}&limit=${limit}`
        },
        data: requestedUsers
    });
};

// GET BY NAME
controller.findByName = (req, res) => {
    const queryName = req.query.name;

    // Insensible à la casse
    users.find({ name : { $regex: new RegExp(queryName, "i") } })
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
    users.create(req.body)
    .then((user) => res.status(201).json({user, message : "User created successfully"}))
    .catch((err) => res.status(500).json({message : "Unable to update user", error : err}));
};

// PUT/PATCH = modifier des données
controller.update = (req, res) => {
    users.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.status(200).json({message: "User updated successfully."}))
    .catch(() => res.status(400).json({error : "Unable to update user"}));
};

// DELETE = supprimer des données
controller.delete = (req, res) => {
    users.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json({message : "User deleted successfully"}))
    .catch(() => res.status(400).json({error : "Unable to delete user"}));
};

module.exports = controller;