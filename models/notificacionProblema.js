const db = require('../database/postgresql');
const { DataTypes } = require('sequelize');

const NotificacionProblemaTabla = db.define('notificacionproblema', {
    id_notificacion_problema: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    descripcion: {
        type: DataTypes.STRING
    },
    fecha:{
        type: DataTypes.DATE
    },
    imagen: {
        type: DataTypes.TEXT
    },
    estado: {
        type: DataTypes.INTEGER,
    },
    id_punto_geografico: {
        type: DataTypes.UUID,
        allowNull: false
    },
    id_tipo_notificacion: {
        type: DataTypes.UUID,
        allowNull: false
    },
    id_usuario: {
        type: DataTypes.UUID,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});

module.exports = NotificacionProblemaTabla