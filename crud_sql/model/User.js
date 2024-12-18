const db = require("../config/databases");
const sequelize = require("sequelize");     // nécessaire pour définir les types

// sequelize.FLOAT pour un décimal
const User = db.define('User', {
    id : { type : sequelize.INTEGER, autoIncrement : true, primaryKey : true },
    name : { type : sequelize.STRING },
    age : { type : sequelize.INTEGER }
});

module.exports = User;