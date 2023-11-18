const {response, request} = require('express');
const LugarPuntoGeograficoTable = require('../models/lugarPuntoGeografico');
const { QueryTypes } = require('sequelize');
const moment = require('moment');

const getListaPuntos = async (req = request, res = response) => {

    const id = req.params.id_lugar;

    const puntos = await LugarPuntoGeograficoTable.sequelize.query(
        `select 
        p2.longitud , p2.latitud 
        from lugar_punto_geografico lpg
        left join puntogeografico p2 on lpg.id_punto_geografico = p2.id_punto_geografico 
        where lpg.id_lugar = ${id};`,
        { type: QueryTypes.SELECT }
    );
    res.status(200).json({
        puntos,
        fecha: moment().format("YYYY-MM-DD")
    });
}

module.exports = {
    getListaPuntos
}