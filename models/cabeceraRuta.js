const db = require('../database/postgresql');
const { DataTypes } = require('sequelize');
const DetalleRutaTable = require('./detalleRuta');

const CabeceraRutaTable = db.define('cabecera_ruta', {
    id_cabecera_ruta: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    diasrutas: {
        type: DataTypes.STRING
    },
    horario: {
        type: DataTypes.TIME
    },
    cantidad_recolectada: {
        type: DataTypes.NUMBER
    },
    id_usuario: {
        type: DataTypes.UUID,
        allowNull: true
    },
    id_vehiculo: {
        type: DataTypes.UUID,
        allowNull: true
    }
},{
    timestamps: false,
    freezeTableName: true
});

CabeceraRutaTable.hasMany( 
    DetalleRutaTable,
    {
        as:"detalleruta",
        foreignKey:"id_cabecera_ruta"    
    } 
);
module.exports = CabeceraRutaTable