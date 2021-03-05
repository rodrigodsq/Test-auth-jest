const Sequelize = require("sequelize");
const dbConfig = require("../config/database");
const Users = require("../models/Users");

const connection = new Sequelize(dbConfig);

Users.init(connection);

module.exports = connection;
