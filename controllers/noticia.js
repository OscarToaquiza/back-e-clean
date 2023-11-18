const { response, request } = require('express');
const NoticiaTable = require('../models/noticia');
const { borrarImagen } = require('./uploads');

const getNoticias = async (req = request, res = response) => {

    const { limite = 10, desde = 0 } = req.query;

    const noticias = await NoticiaTable.findAndCountAll(
        { offset: Number(desde), limit: Number(limite) }
    );

    res.status(200).json({
        noticias
    });
}

const getNoticia = async (req = request, res = response) => {

    const id = req.params.id_noticia;
    const noticia = await NoticiaTable.findOne({
        where: { id_noticia: id }
    });

    res.status(200).json({
        noticia
    });
}

const putNoticia = async (req = request, res = response) => {

    const id = req.params.id_noticia;
    const { id_noticia, ...dataNoticia } = req.body;
    const noticia = await NoticiaTable.update(
        dataNoticia,
        {
            where: { id_noticia: id }
        });

    res.status(200).json({
        noticia
    });
}

const postNoticia = async (req, res = response) => {

    const body = req.body;
    const noticia = new NoticiaTable(body);
    await noticia.save();

    res.status(200).json({
        noticia
    });
}

const deleteNoticia = async (req, res = response) => {

    const id = req.params.id_noticia;

    try {
        const noticia = await NoticiaTable.findByPk(id);
        //Borrar imagen
        if (noticia.imagen) {
            const pahtImagen = `./uploads/noticias/${noticia.imagen}`;
            borrarImagen(pahtImagen);
        }

        const result = await NoticiaTable.destroy({
            where: { id_noticia: noticia.id_noticia }
        });

        //resp = 1
        res.status(200).json({
            result
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error
        });
    }
}

module.exports = {
    getNoticias,
    getNoticia,
    putNoticia,
    postNoticia,
    deleteNoticia
}