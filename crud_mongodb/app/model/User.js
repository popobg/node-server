const mongoose = require("mongoose");

// No id in mongoDB schema: it automatically create an _id (type UIid)
// It creates an _v = 0 --> multiple schema version
const schema = mongoose.Schema({
    name : String,
    age : Number
});

// On fait nos requêtes sur l'objet collection
const collection = mongoose.model('user', schema);
module.exports = collection;