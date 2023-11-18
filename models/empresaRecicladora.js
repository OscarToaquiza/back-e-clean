const db = require('../database/postgresql');
const { DataTypes } = require('sequelize');
const PuntoGeograficoTable = require('./puntoGeografico');

const EmpresaRecicladoraTable = db.define('empresarecicladora', {
    id_empresa_recicladora: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    direccion: {
        type: DataTypes.TEXT
    },
    telefono: {
        type: DataTypes.TEXT
    },
    id_punto_geografico: {
        type: DataTypes.UUID,
        allowNull: true
    },
    detalle: {
        type: DataTypes.TEXT,
    }
},{
    timestamps: false,
    freezeTableName: true
});

EmpresaRecicladoraTable.hasOne( 
    PuntoGeograficoTable, 
    {
        as:"ubicacion",
        foreignKey:"id_punto_geografico"    
    }
);

module.exports = EmpresaRecicladoraTable