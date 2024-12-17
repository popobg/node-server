const express = require("express");

// express tourne sur node, permet de lancer un serveur web
// qui écoute de nouvelles requêtes ==> le serveur tourne en continu
const app = express();
// gérer le body de la requête
app.use(express.json());

// http://localhost:3000/
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// DATA
const users = [
    {id: 1, name: 'Jules', age: 35},
    {id: 2, name: 'Pierre', age: 25},
    {id: 3, name: 'Thomas', age: 28},
    {id: 4, name: 'Georgette', age: 70},
    {id: 5, name: 'Vincent', age: 15},
    {id: 6, name: 'Roxanne', age: 43},
    {id: 7, name: 'Léa', age: 4},
    {id: 8, name: 'Emilie', age: 56},
    {id:9, name: 'Alexandra', age: 41},
    {id: 10, name: 'Gilles', age: 9},
    {id: 11, name: 'Georgette', age: 2}
]
maxId = 11;


// GET ALL
// pagination disponible en query : "/users?page=2&limit=2"
app.get("/users", (req, res) => {
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

    const paginatedUsers = users.slice(startIndex, endIndex);

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
        data: paginatedUsers
    };

    res.json(result);
});

// GET BY NAME
// définir cette fonction avant id, sinon "search" est considérée comme un id par express
app.get("/users/search", (req, res) => {
    if(req.query.name !== undefined) {
        const queryName = req.query.name.toLowerCase();

        let requestedUsers = users.filter((u) => u.name.toLowerCase() == queryName);

        res.status(200).send(requestedUsers);
        return;
    }

    res.status(404).json({error: "No query."});
});

// GET BY ID
// param et query : toujours des strings
app.get("/users/:id", (req, res) => {
    const user = users.find((u) => u.id == req.params.id);

    if (user) {
        res.status(200).json(user);
    }
    else {
        res.status(404).json({message: "User not found."});
    }
});

// Middlewares gestion d'erreurs
const nameIsValid = (req, res, next) => {
    const {name} = req.body;

    if (!name || typeof name != 'string' || name === "") {
        return res.status(400).json({error: "The name must have at least one character."});
    }

    next();
}

const ageIsValid = (req, res, next) => {
    const {age} = req.body;

    if (!age || !Number.isInteger(age) || age < 0) {
        return res.status(400).json({error: "The age must be a positive integer."});
    }

    next();
}

// POST = ajouter des données
app.post("/users", [nameIsValid, ageIsValid], (req, res) => {
    const {name, age} = req.body;
    maxId++;

    const user = {id: maxId, name, age};
    users.push(user);

    res.status(201).json({user, message: "User created successfully."});
});

// PUT/PATCH = modifier des données
// PUT = modifier seulement quelques champs (peut jouer le rôle d'un post si l'objet n'existe pas mais rare)
// PATCH = modifier tous les champs d'un objet
app.put("/users/:id", [nameIsValid, ageIsValid], (req, res) => {
    const {name, age} = req.body;
    const id = parseInt(req.params.id);

    const user = {id, name, age};

    // On retire le précédent utilisateur et on le rajoute une fois les modifications effectuées (même id)
    users = users.filter((u) => u.id !== req.params.id);
    users.push(user);

    res.status(200).json({ message: "User updated successfully."});
});

// DELETE = supprimer des données
app.delete("/users/:id", (req, res) => {
    users = users.filter((u) => u.id != req.params.id);
    res.status(200).json({ message: "User deleted successfully."});
});

// Alternative middleware
const myMiddleware = (req, res, next) => {
    console.log("In middleware");

    if (Math.random() > 0.5) {
        next();
        return;
    }

    return res.send("Blocked");
};

app.get("/test/middleware", myMiddleware, (req, res) => {
    return res.send("Next middleware");
});

// global middleware
app.use((req, res) =>{
    setTimeout(() => {
        console.log("Après 2 secondes...");
        res.status(404).json({error: "Route not found."});
    }, 2000);
});

// Server error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: "Internal server error."});
});