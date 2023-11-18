const db = require('../database/postgresql');
const { DataTypes } = require('sequelize');
const PuntoGeograficoTable = require('./puntoGeografico');

const DetalleRutaTable = db.define('detalleruta', {
    id_detalle_ruta: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    id_cabecera_ruta: {
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

DetalleRutaTable.belongsTo( 
    PuntoGeograficoTable ,
    {
        as:"punto",
        foreignKey:"id_punto_geografico"    
    } 
);

module.exports = DetalleRutaTable