const db = require('../database/postgresql');
const { DataTypes, DATE, Sequelize } = require('sequelize');

const NoticiaTable = db.define('noticia', {
    id_noticia: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING
    },
    detalle: {
        type: DataTypes.TEXT
    },
    imagen: {
        type: DataTypes.TEXT
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    fecha_creacion:{
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
    }
},{
    timestamps: false,
    freezeTableName: true
});


module.exports = NoticiaTable