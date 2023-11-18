const {response, request} = require('express');
const TipoDatoTable = require('../models/tipoDato');

const getTiposDatosActivos = async (req = request,res = response) =>{

    const { limite = 10, desde = 0 } = req.query;
    const tiposDatos = await TipoDatoTable.findAndCountAll(
        { 
            where: { estado: true },
            offset: Number(desde), limit: Number(limite) 
        }
    );

    res.status(200).json({
        tiposDatos
    });
}

const getTiposDatosDesactivados = async (req = request,res = response) =>{

    const { limite = 10, desde = 0 } = req.query;
    const tiposDatos = await TipoDatoTable.findAndCountAll(
        { 
            where: { estado: false },
            offset: Number(desde), limit: Number(limite) 
        }
    );

    res.status(200).json({
        tiposDatos
    });
}

const getTipoDato = async (req = request,res = response) =>{

    const id = req.params.id_tipo_dato;
    const tipoDato = await TipoDatoTable.findOne({
        where: {id_tipo_dato: id}
    });

    res.status(200).json({
        tipoDato
    });
}

const putTipoDato = async (req = request,res = response) =>{

    const id = req.params.id_tipo_dato;
    const { id_tipo_dato, ... dataTipoData } = req.body;
    const tipoData = await TipoDatoTable.update(
        dataTipoData,
        {where: {id_tipo_dato: id}
    });

    res.status(200).json({
        tipoData
    });
}

const postTipoData = async (req,res = response) =>{

    const body = req.body;
    const tipoData = new TipoDatoTable( body );
    await tipoData.save();
    
    res.status(200).json({
        tipoData
    });
}

const patchTipoData = async (req,res = response) =>{

    const id = req.params.id_tipo_dato;
    const estado = req.body.estado;
    const tipoData = await TipoDatoTable.update(
        {estado},
        {where: {id_tipo_dato: id}
    });

    res.status(200).json({
        tipoData
    });
}

/**
 * El manejo de los tipos de datos se van a clasificar por el campo tipo
 * 1 = Notificaciones
 * 2 = Servicio
 * 3 = Desperdicios
 */
const getListaByTipo = async (req = request,res = response) =>{

    const tipo = req.params.tipo;
    const estado = req.params.estado;
    const { limite = 5, desde = 0 } = req.query;
    const tiposDatos = await TipoDatoTable.findAndCountAll(
        { 
            where: { estado, tipo },
            offset: Number(desde), limit: Number(limite) 
        }
    );

    res.status(200).json({
        tiposDatos
    });
}

const getAllListaByTipo = async (req = request,res = response) =>{

    const tipo = req.params.tipo;
    const estado = true;
    const tiposDatos = await TipoDatoTable.findAll(
        { 
            where: { tipo, estado },
            attributes: ["id_tipo_dato","nombre"]
        }
    );

    res.status(200).json({
        tiposDatos
    });
}



module.exports = {
    getTiposDatosDesactivados,
    getTiposDatosActivos,
    getTipoDato,
    putTipoDato,
    postTipoData,
    patchTipoData,
    getListaByTipo,
    getAllListaByTipo
}