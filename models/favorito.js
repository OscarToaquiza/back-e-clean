const db = require('../database/postgresql');
const { DataTypes } = require('sequelize');
const NoticiaTable = require('./noticia');

const FavoritoTable = db.define('noticia', {
    id_favorito: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true
    },
    observacion: {
        type: DataTypes.TEXT
    },
    id_noticia: {
        type: DataTypes.UUID,
        allowNull: false
    }
},{
    timestamps: false,
    freezeTableName: true
});

FavoritoTable.hasMany( NoticiaTable, {
    as:"moticias",
    foreignKey: "id_noticia"
} )


module.exports = FavoritoTable