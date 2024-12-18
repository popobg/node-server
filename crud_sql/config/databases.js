// npm i sqlite3
// npm i sequelize
const sequelize = require("sequelize");

const db = new sequelize({
    // SGBD utilisée
    dialect : "sqlite",
    // localisation de la db
    storage : "./db.sqlite"
});

// création des tables automatique
db.sync();

module.exports = db;