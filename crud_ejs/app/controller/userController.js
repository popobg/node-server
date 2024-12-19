const users = require("../model/User");
const { Op } = require("sequelize");

const controller = {};

// READ
controller.findAll = async (req, res) => {
    try {
        const allUsers = await users.findAll();
        res.render("../views/index", {allUsers});
    }
    catch (error) {
        res.sender("../views/error/error", {message : error.message});
    }
};

// GET BY NAME
// controller.findByName = async (req, res) => {
//     const queryName = req.query.name;

//     // Si on n'en veut qu'un, on fait "findOne" et il prendra le premier trouvé
//     const requestedUsers = await users.findAll({
//         where: {
//           name: {
//             // insensible à la casse + match une portion du nom
//             [Op.like]: `%${queryName}%`
//           },
//         },
//       });

//     console.log(requestedUsers);

//     res.send(requestedUsers);
// };

controller.findById = async (req, res) => {
    const user = await users.findByPk(parseInt(req.params.id));
    res.render("../views/user/details", {user});
};

// CREATE
controller.getCreatePage = (req, res) => {
    res.render("../views/user/create");
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
        res.render("../views/error/error", { message: "Failed to create new user" });
    }
};

// UPDATE
controller.getUpdatePage = async (req, res) => {
    const user = await users.findByPk(parseInt(req.params.id));
    res.render("../views/user/update", {user});
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
        res.render("../views/error/error", { message: "Failed to update user." });
    }
};

// DELETE
controller.delete = async (req, res) => {
    console.log(req.params.id);
    const user = await users.destroy({
        where: { id: parseInt(req.params.id) }
    });
    console.log(user)

    if (user) {
        console.log("user deleted");
        return res.status(200);
        // return res.status(200);
    }
    else {
        return res.status(400);
    }
};

module.exports = controller;