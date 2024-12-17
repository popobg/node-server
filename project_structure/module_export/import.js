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

// importer les fonctions du fichier productRouter
const imports = require("./export");

imports.sayHello();
imports.sayBye();