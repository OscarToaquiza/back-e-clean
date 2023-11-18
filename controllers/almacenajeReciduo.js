const { response, request } = require('express');
const { QueryTypes } = require('sequelize');
const AlmacenajeResiduosTable = require('../models/almacenajeReciduo');

const getAlmacenajesResiduos = async (req = request, res = response) => {

    const { limite = 10, desde = 0 } = req.query;

    const rows = await AlmacenajeResiduosTable.sequelize.query(
        `select 
            a2.id_almacenaje_reciduo, 
            a2.nombre,
            a2.capacidad,
            a2.estado,
            a2.tipo,
            a2.detalle,
            l2.nombre as sector,
            l2.id_lugar,
            p2.latitud,
            p2.longitud  
        from almacenajereciduo a2 
            left join puntogeografico p2 on a2.id_punto_geografico = p2.id_punto_geografico 
            left join lugar l2 on p2.id_lugar = l2.id_lugar  
        limit ${limite} offset ${desde};`,
        { type: QueryTypes.SELECT }
    );

    const count = await AlmacenajeResiduosTable.sequelize.query(
        `SELECT count(*) FROM almacenajereciduo;`,
        { type: QueryTypes.SELECT }
    );

    let almacenajesResiduos = {
        count: count[0].count,
        rows
    }

    res.status(200).json({
        almacenajesResiduos
    });
}

const getTotalAlmacenajesResiduos = async (req = request, res = response) => {

    console.log("getTotalAlmacenajesResiduos");

    try {
        const count = await AlmacenajeResiduosTable.sequelize.query(
            `SELECT count(*) FROM almacenajereciduo ar where ar.estado = true;`,
            { type: QueryTypes.SELECT }
        );

        res.status(200).json({
            total: count[0].count
        });
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            total: 0
        });
    }
}

const getAlmacenajeResiduo = async (req = request, res = response) => {

    const id = req.params.id_almacenaje_reciduo;
    const almacenajeResiduo = await AlmacenajeResiduosTable.findByPk(id);

    res.status(200).json({
        almacenajeResiduo
    });
}

const putAlmacenajeResiduo = async (req = request, res = response) => {

    const id = req.params.id_almacenaje_reciduo;
    const { id_almacenaje_reciduo, ...dataAlmacenajeResiduo } = req.body;
    const almacenajeResiduo = await AlmacenajeResiduosTable.update(
        dataAlmacenajeResiduo,
        {
            where: { id_almacenaje_reciduo: id }
        });

    res.status(200).json({
        almacenajeResiduo
    });
}

const postAlmacenajeResiduo = async (req, res = response) => {

    const body = req.body;
    const almacenajeResiduo = new AlmacenajeResiduosTable(body);
    await almacenajeResiduo.save();

    res.status(200).json({
        almacenajeResiduo
    });
}

/**
 * Obtner la lista de contenedores de un lugar especifico, con sus respectivas coordenadas
 * @param {id_lugar} req 
 * @param {json} res 
 */
const getListAlamcenajeResiduoBySector = async (req, res = response) => {

    const id = req.params.id_lugar;

    const listaAlmacenajesResiduos = await AlmacenajeResiduosTable.sequelize.query(
        `select 
            a2.id_almacenaje_reciduo,
            a2.nombre,
            a2.tipo,
            p2.longitud,
            p2.latitud 
        from almacenajereciduo a2 
            left join puntogeografico p2 on a2.id_punto_geografico = p2.id_punto_geografico
            left join lugar l2 on p2.id_lugar = l2.id_lugar
        where a2.estado = true and l2.id_lugar = ${id};`,
        { type: QueryTypes.SELECT }
    );

    res.status(200).json({
        listaAlmacenajesResiduos
    });
}

module.exports = {
    getAlmacenajesResiduos,
    getAlmacenajeResiduo,
    putAlmacenajeResiduo,
    postAlmacenajeResiduo,
    getListAlamcenajeResiduoBySector,
    getTotalAlmacenajesResiduos
}