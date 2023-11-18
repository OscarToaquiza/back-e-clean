const { response, request } = require('express');
const TramiteTable = require('../models/tramite');

const getTramites = async (req = request, res = response) => {

    const { limite = 10, desde = 0 } = req.query;

    const tramites = await TramiteTable.findAndCountAll(
        { offset: Number(desde), limit: Number(limite) }
    );

    res.status(200).json({
        tramites
    });
}

const getTramite = async (req = request, res = response) => {

    const id = req.params.id_tramite;
    const tramite = await TramiteTable.findByPk(id);

    res.status(200).json({
        tramite
    });
}

const putTramite = async (req = request, res = response) => {

    const id = req.params.id_tramite;
    const { id_tramite, ...dataTramite } = req.body;
    const tramite = await TramiteTable.update(
        dataTramite,
        {
            where: { id_tramite: id }
        });

    res.status(200).json({
        tramite
    });
}

const postTramite = async (req, res = response) => {

    const body = req.body;
    const tramite = new TramiteTable(body);
    await tramite.save();

    res.status(200).json({
        tramite
    });
}

const deleteTramite = async (req, res = response) => {

    const id = req.params.id_tramite;

    try {
       
        const result = await TramiteTable.destroy({
            where: { id_tramite: id }
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
    getTramites,
    getTramite,
    putTramite,
    postTramite,
    deleteTramite
}