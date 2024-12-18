const mongoose = require("mongoose");

// Pas d'id dans le schéma MongoDB : un _id de type UIid est automatiquement créé
// Un _v = 0 est aussi créé, utile en cas de multi-version
const schema = mongoose.Schema({
    name : String,
    age : Number
});

// On fait nos requêtes sur l'objet collection
const collection = mongoose.model('user', schema);
module.exports = collection;