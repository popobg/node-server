const express = require("express");

// express tourne sur node, permet de lancer un serveur web
// qui écoute de nouvelles requêtes ==> le serveur tourne en continu
const app = express();

// Permet de recevoir du json dans les méthodes post/put...
// app.use(express.json);
// on peut se connecter en allant sur http://localhost:3000/
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// GET = récupérer des données
app.get('/hello', (req, res) => {
    res.send("Bonjour, bienvenue dans notre API !");
});

// paramètre passé en url
app.get('/users/:name', (req, res) => {
    res.send(`Bonjour ${req.params.name} !`);
});

app.get('/product/:category/:id', (req, res) => {
    res.send(`Produit d'ID ${req.params.id} dans la catégorie ${req.params.category}.`);
});

// query (requête) '?search=query'
app.get('/search', (req, res) => {
    if (req.query.search === undefined) {
        res.send("Aucune recherche effectuée");
    }
    else {
        res.send(`Vous avez recherché : ${req.query.search}.`);
    }
});

// renvoie du HTML = server-side rendering
app.get('/welcome', (req, res) => {
    res.send(`<h1>Bienvenue sur notre site</h1>
        <p>Explorez nos fonctionnalités</p>`);
});

// renvoie un élément JSON ==> client-side rendering
app.get('/api/info', (req, res) => {
    const info = {
        message: "Bienvenue sur notre API",
        status: "Success"
    };
    res.json(info);
});

// query + paramètre url
app.get('/profile/:username', (req, res) => {
    if(req.query.age === undefined) {
        res.send(`Profil de ${req.params.username}, âge non spécifié.`);
    }
    else {
        res.send(`Profil de ${req.params.username}, âge : ${req.query.age}.`);
    }
});

app.get('/error', (req, res) => {
    if(Math.random() > 0.5) {
        res.status(200).json({message : "ok"});
    }
    else {
        res.status(500).json({error: "Server error"});
    }
});

app.get('/api/users', (req, res) => {
    const users = [
        {name: 'Jules', age: 35},
        {name: 'Pierre', age: 25},
        {name: 'Thomas', age: 28},
        {name: 'Georgette', age: 70},
        {name: 'Vincent', age: 15},
        {name: 'Roxanne', age: 43},
        {name: 'Léa', age: 4},
        {name: 'Emilie', age: 56},
        {name: 'Alexandra', age: 41},
        {name: 'Gilles', age: 9},
        {name: 'Georgette', age: 2}
    ];


    if(req.query.name !== undefined) {
        const selectedUsers = users.filter(u => u.name === req.query.name);
        if (selectedUsers[0].length > 0) {
            res.send(selectedUsers);
            return;
        }
    }

    res.send(error);
});

// POST = ajouter des données

// PUT/PATH = modifier des données
// PUT = modifier seulement quelques champs (peut jouer le rôle d'un post si l'objet n'existe pas mais rare)
// PATCH = modifier tous les champs d'un objet

// DELETE = supprimer des données