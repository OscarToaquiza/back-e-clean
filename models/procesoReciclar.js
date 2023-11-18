const db = require('../database/postgresql');
const { DataTypes } = require('sequelize');

const ProcesoReciclarTable = db.define('proceso_reciclar', {
    id_proceso_reciclar: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    detalle_proceso_reciclar: {
        type: DataTypes.TEXT
    },
    imagen: {
        type: DataTypes.TEXT
    },
    id_tipo_desperdicio:{
        type: DataTypes.UUID,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});


module.exports = ProcesoReciclarTable