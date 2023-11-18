const {response, request} = require('express');
const EmpresaRecicladoraTable = require('../models/empresaRecicladora');
const { QueryTypes } = require('sequelize');

const getEmpresasRecicladoras = async (req = request,res = response) =>{
    
    const { limite = 10, desde = 0 } = req.query;

    const rows = await EmpresaRecicladoraTable.sequelize.query(
        `select 
            e2.id_empresa_recicladora, 
            e2.nombre,
            e2.direccion,
            e2.detalle,
            l2.nombre as sector,
            l2.id_lugar,
            p2.latitud,
            p2.longitud 
        from empresarecicladora e2 
            left join puntogeografico p2 on e2.id_punto_geografico = p2.id_punto_geografico 
            left join lugar l2 on p2.id_lugar = l2.id_lugar 
            limit ${limite} offset ${desde};`,
            { type: QueryTypes.SELECT }
    );

    const count = await EmpresaRecicladoraTable.sequelize.query(
        `SELECT count(*) FROM empresarecicladora;`,
        { type: QueryTypes.SELECT }
    );

    let empresasRecicladoras = {
        count: count[0].count,
        rows
    }

    res.status(200).json({
        empresasRecicladoras
    });

}

const getEmpresaRecicladora = async (req = request,res = response) =>{

    const id = req.params.id_empresa_recicladora;
    const empresaRecicladora = await EmpresaRecicladoraTable.findByPk(id);

    res.status(200).json({
        empresaRecicladora
    });
}

const putEmpresaRecicladora = async (req = request,res = response) =>{

    const id = req.params.id_empresa_recicladora;
    const { id_empresa_recicladora, ... dataEmpresaRecicladora } = req.body;
    const empresaRecicladora = await EmpresaRecicladoraTable.update(
        dataEmpresaRecicladora,
        {where: {id_empresa_recicladora: id}
    });

    res.status(200).json({
        empresaRecicladora
    });
}

const postEmpresaRecicladora = async (req,res = response) =>{

    const body = req.body;
    const empresaRecicladora = new EmpresaRecicladoraTable( body );
    await empresaRecicladora.save();
    
    res.status(200).json({
        empresaRecicladora
    });
}

/**
 * Obtner la lista de empresas de un lugar especifico, con sus respectivas coordenadas
 * @param {id_lugar} req 
 * @param {json} res 
 */
 const getListEmpresasBySector = async (req,res = response) => {
    
    const id = req.params.id_lugar;

    const listaEmpresas = await EmpresaRecicladoraTable.sequelize.query(
        `select 
            e2.id_empresa_recicladora, 
            e2.nombre,
            p2.longitud,
            p2.latitud 
        from empresarecicladora e2 
            left join puntogeografico p2 on e2.id_punto_geografico = p2.id_punto_geografico
            left join lugar l2 on p2.id_lugar = l2.id_lugar
        where l2.id_lugar = ${id};`,
        { type: QueryTypes.SELECT }
    );

    res.status(200).json({
        listaEmpresas
    });
}



module.exports = {
    getEmpresasRecicladoras,
    getEmpresaRecicladora,
    putEmpresaRecicladora,
    postEmpresaRecicladora,
    getListEmpresasBySector
}