const db = require('../database/postgresql');
const { DataTypes } = require('sequelize');

const LugarTable = db.define('lugar', {
    id_lugar: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    observacion: {
        type: DataTypes.STRING
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = LugarTable