const db = require('../database/postgresql');
const { DataTypes } = require('sequelize');
const TipoDatoTable = require('./tipoDato');

const EmpresaTipoDesperdicioTable = db.define('empresa_tipo_desperdicio', {
    id_empresa_tipo_desperdicio: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    id_empresa_recicladora: {
        type: DataTypes.UUID,
        allowNull: false
    },
    id_tipo_desperdicio: {
        type: DataTypes.UUID,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = EmpresaTipoDesperdicioTable