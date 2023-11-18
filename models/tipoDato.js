const db = require('../database/postgresql');
const { DataTypes } = require('sequelize');

const TipoDatoTable = db.define('tipo_dato', {
    id_tipo_dato: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    nombre:{
        type: DataTypes.STRING
    },
    estado:{
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    observacion: {
        type: DataTypes.TEXT
    }
},{
    timestamps: false,
    freezeTableName: true
});


module.exports = TipoDatoTable