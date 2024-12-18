const users = require("../model/User");
const { Op } = require("sequelize");

const controller = {};

// GET ALL (with pagination)
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

    users.findAndCountAll({
        limit: limit,
        // starting index
        offset: (page - 1) * limit
    })
    .then(async (data) =>  {
        // Count all the users in the db
        const userCount = await users.count();
        let totalPages = userCount / limit;

        if (totalPages % 1 !== 0) {
            totalPages = Math.floor(totalPages) + 1;
        }

        res.status(200).json({
        totalPages: totalPages,
        currentPage : page,
        limit: limit,
        links: {
            previous: `http://localhost:3000/users?page=${page-1}&limit=${limit}`,
            current: `http://localhost:3000/users?page=${page}&limit=${limit}`,
            next: `http://localhost:3000/users?page=${page+1}&limit=${limit}`
        },
        data: data.rows
        });
    })
    .catch(() => res.status(400).json({error : "No user found."}));
};

// GET BY NAME
controller.findByName = async (req, res) => {
    const queryName = req.query.name;

    // Si on n'en veut qu'un, on fait "findOne" et il prendra le premier trouvé
    const requestedUsers = await users.findAll({
        where: {
          name: {
            // insensible à la casse + match une portion du nom
            [Op.like]: `%${queryName}%`
          },
        },
      });

    console.log(requestedUsers);

    res.send(requestedUsers);
    // users.findAll({
    //     where : { name: queryName }
    // }).then((requestedUsers) => res.status(200).send(requestedUsers))
    // .catch(() => res.status(400).json({error : "No user found by that name"}));
};

// GET BY ID
controller.findById = async (req, res) => {
    // findOne permet d'utiliser where, donc permet plus de spécificité dans la requête ;
    // findByPk idnetifie l'entrée à renvoyer à partir de sa clé primaire (ici l'id).
    const user = await users.findByPk(req.params.id);

    if (user) {
        res.status(200).send(user)
    }
    else {
        res.status(404).json({ message: "User not found." });
    }
};

// POST = ajouter des données
controller.add = async (req, res) => {
    const { name, age } = req.body

    const user = {
        name: name,
        age: age
    };

    const newUser = await users.create(
        {
            name: name,
            age: age
        }
    );

    if (newUser) {
        console.log("User created successfully");
        res.status(201).json({ message: "User created successfully", user: newUser });
    }
    else {
        res.status(500).json({ message: "Unable to create new user" });
    }
};

// PUT/PATCH = modifier des données
controller.update = async (req, res) => {
    const { name, age } = req.body;
    const id = parseInt(req.params.id);

    const user = await users.update(
        { name: name, age: age },
        { where: { id: id } }
    )

    if (user) {
        res.status(200).json({ message: "User updated successfully." });
    }
    else {
        res.status(404).json({ message: "Unable to update user." });
    }
};

// DELETE = supprimer des données
controller.delete = async (req, res) => {
    const user = await users.destroy({
        where: { id: req.params.id }
    });

    if (user) {
        res.status(200).json({ message: "User deleted successfully." });
    }
    else {
        res.status(400).json({ message: "Unable to delete user." })
    }
};

module.exports = controller;