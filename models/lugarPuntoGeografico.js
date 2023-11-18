const db = require('../database/postgresql');
const { DataTypes } = require('sequelize');

const LugarPuntoGeograficoTable = db.define('lugar_punto_geografico', {
    id_lugar_punto_geografico: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    id_lugar: {
        type: DataTypes.UUID,
        allowNull: false
    },
    id_punto_geografico: {
        type: DataTypes.UUID,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = LugarPuntoGeograficoTable