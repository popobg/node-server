const UserRepository = require("../repository/userRepository");

const controller = {};

controller.findAll = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    if (page <= 0) {
        return res.status(400).json({error: "The page must be a positive integer."});
    }

    if (limit <= 0) {
        return res.status(400).json({error: "The limit must be a positive integer."});
    }

    try {
        return res.status(200).json(await UserRepository.findAllUsers(page, limit));
    } catch (error) {
        return res.status(500).json({message: "Unable to retrieve users", error: error.message});
    }
};

controller.findByName = async (req, res) => {
    try {
        return res.status(200).json(await UserRepository.findUsersByName(req.query.name));
    } catch (error) {
        return res.status(400).json({message: "User not found by that name", error: error.message});
    }
};

controller.findById = async (req, res) => {
    try {
        return res.status(200).json(await UserRepository.findUserById(parseInt(req.params.id)));
    } catch (error) {
        return res.status(400).json({message: "User not found", error: error.message});
    }
};

controller.addUser = async (req, res) => {
    try {
        return res.status(201).json({message: "User create successfully", user : await UserRepository.createUser(req.body)});
    } catch (error) {
        return res.status(400).json({message: "Fail to create user", error: error.message});
    }
};

controller.updateUser = async (req, res) => {
    try {
        return res.status(200).json({message: "User updated successfully", user : await UserRepository.updateUser(parseInt(req.params.id), req.body)});
    } catch (error) {
        return res.status(400).json({message: "Fail to update user", error: error.message});
    }
};

controller.deleteUser = async (req, res) => {
    try {
        return res.status(200).json({message: "User deleted successfully", user : await UserRepository.deleteUser(parseInt(req.params.id))});
    } catch (error) {
        return res.status(400).json({message: "Fail to delete user", error: error.message});
    }
};

module.exports = controller;