const {response, request} = require('express');
const FavoritoTable = require('../models/favorito');
const NoticiaTable = require('../models/noticia');

const getFavoritos = async (req = request,res = response) =>{

    const favoritos = await FavoritoTable.findAll();

    res.status(200).json({
        favoritos
    });
}

const getFavorito = async (req = request,res = response) =>{

    const id = req.params.id_favorito;
    const favorito = await FavoritoTable.findOne({
        where: {id_Favorito: id},
        include: {
            model: NoticiaTable,
            as: "noticias"
        }
    });

    res.status(200).json({
        favorito
    });
}

const putFavorito = async (req = request,res = response) =>{

    const id = req.params.id_favorito;
    const { id_favorito, ... dataFavorito } = req.body;
    const favorito = await FavoritoTable.update(
        dataFavorito,
        {where: {id_favorito: id}
    });

    res.status(200).json({
        favorito
    });
}

const postFavorito = async (req,res = response) =>{

    const body = req.body;
    const favorito = new FavoritoTable( body );
    await favorito.save();
    
    res.status(200).json({
        favorito
    });
}

module.exports = {
    getFavoritos,
    getFavorito,
    putFavorito,
    postFavorito
}