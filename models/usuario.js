const db = require('../database/postgresql');
const { DataTypes } = require('sequelize');

const UsuarioTable = db.define('usuario', {
    id_usuario: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    cedula: {
        type: DataTypes.STRING
    },
    rol: {
        type: DataTypes.INTEGER
    },
    usuario: {
        type: DataTypes.STRING
    },
    contrasenia: {
        type: DataTypes.TEXT
    },
    puestotrabajo: {
        type: DataTypes.TEXT
    },
    telefono: {
        type: DataTypes.STRING
    },
    observacion: {
        type: DataTypes.TEXT
    },
    imagen_perfil: {
        type: DataTypes.TEXT
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = UsuarioTable