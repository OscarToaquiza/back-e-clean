const db = require('../database/postgresql');
const { DataTypes } = require('sequelize');

const VehiculoTable = db.define('vehiculo', {
    
    id_vehiculo: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    placa: {
        type: DataTypes.STRING
    },
    modelo: {
        type: DataTypes.STRING
    },
    marca: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING,
        defaultValue: "1"
    },
    estado_fisico: {
        type: DataTypes.STRING
    },
    observacion: {
        type: DataTypes.STRING
    },
    id_punto_geografico:{
        type: DataTypes.NUMBER,
        allowNull: true
    },
    detalle:{
        type: DataTypes.TEXT,
        allowNull: true
    }
},{
    timestamps: false,
    freezeTableName: true
});


module.exports = VehiculoTable