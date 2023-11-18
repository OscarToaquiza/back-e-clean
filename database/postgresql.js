const { Sequelize } = require('sequelize');
const configConexion = require('./config');
const db = new Sequelize(
    configConexion
);

module.exports = db;