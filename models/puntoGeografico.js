const db = require('../database/postgresql');
const { DataTypes } = require('sequelize');

const PuntoGeograficoTable = db.define('puntogeografico', {
    id_punto_geografico: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    latitud: {
        type: DataTypes.TEXT
    },
    longitud: {
        type: DataTypes.TEXT
    },
    id_lugar:{
        type: DataTypes.UUID,
        allowNull: true
    }
},{
    timestamps: false,
    freezeTableName: true
});


module.exports = PuntoGeograficoTable