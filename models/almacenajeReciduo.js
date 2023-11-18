const db = require('../database/postgresql');
const { DataTypes } = require('sequelize');
const PuntoGeograficoTable = require('./puntoGeografico');

const AlmacenajeResiduosTable = db.define('almacenajereciduo', {
    id_almacenaje_reciduo: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.TEXT
    },
    capacidad: {
        type: DataTypes.NUMBER
    },
    estado: {
        type: DataTypes.BOOLEAN
    },
    id_punto_geografico: {
        type: DataTypes.UUID,
        allowNull: false
    },
    tipo:{
        type: DataTypes.NUMBER
    },
    detalle:{
        type: DataTypes.TEXT,
        allowNull: true
    }
},{
    timestamps: false,
    freezeTableName: true
});

AlmacenajeResiduosTable.hasOne( PuntoGeograficoTable, {
    as:"ubicacion",
    foreignKey:"id_punto_geografico"
} );

module.exports = AlmacenajeResiduosTable