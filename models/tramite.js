const db = require('../database/postgresql');
const { DataTypes } = require('sequelize');

const TramiteTable = db.define('tramite', {
    id_tramite: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    detalles: {
        type: DataTypes.TEXT
    }
},{
    timestamps: false,
    freezeTableName: true
});


module.exports = TramiteTable