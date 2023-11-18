const {response, request} = require('express');
const classifyPoint = require("robust-point-in-polygon");
const { QueryTypes } = require('sequelize');
const lodash = require('lodash');
const LugarPuntoGeograficoTable = require('../models/lugarPuntoGeografico');
const PuntoGeograficoTable = require('../models/puntoGeografico');

const getPuntosGeograficos = async (req = request,res = response) =>{

    const puntosGeograficos = await PuntoGeograficoTable.findAll();

    res.status(200).json({
        puntosGeograficos
    });
}

const getPuntoGeografico = async (req = request,res = response) =>{

    const id = req.params.id_punto_geografico;
    const puntoGeografico = await PuntoGeograficoTable.findByPk(id);

    res.status(200).json({
        puntoGeografico
    });
}

const putPuntoGeografico = async (req = request,res = response) =>{

    const id = req.params.id_punto_geografico;
    const { id_punto_geografico, ... dataPuntoGeografico } = req.body;
    
    let idLugar = await calcularSector(dataPuntoGeografico.longitud, dataPuntoGeografico.latitud);
    dataPuntoGeografico.id_lugar = idLugar;
    const puntoGeografico = await PuntoGeograficoTable.update(
        dataPuntoGeografico,
        {where: {id_punto_geografico: id}
    });

    res.status(200).json({
        puntoGeografico
    });
}

const postPuntoGeografico = async (req,res = response) =>{

    const body = req.body;
    const puntoGeografico = new PuntoGeograficoTable( body );

    let idLugar = await calcularSector(puntoGeografico.longitud, puntoGeografico.latitud);
    console.log(idLugar);
    if(idLugar != null){
        puntoGeografico.id_lugar = idLugar;
    }
    await puntoGeografico.save();
    
    res.status(200).json({
        puntoGeografico
    });
}


const calcularSector = async (x,y) => {

    let puntoGuardar = [x,y];
    let idLugar = null;

    let listaSectores = await LugarPuntoGeograficoTable.sequelize.query(
        `select lpg.id_lugar, p.longitud, p.latitud
        from lugar_punto_geografico lpg 
        left join puntogeografico p on lpg.id_punto_geografico = p.id_punto_geografico;;`,
        { type: QueryTypes.SELECT }
    );

    let polygon = await lodash.groupBy(listaSectores, 'id_lugar');

    Object.keys(polygon).map( (key) => {
        
        let listaPuntosSector = new Array;
        
        polygon[key].forEach( punto => {
            let puntos = [ parseFloat(punto.longitud), parseFloat(punto.latitud)];
            listaPuntosSector.push(puntos);
        });

        let puntoInArea = classifyPoint(listaPuntosSector, puntoGuardar );
        console.log(puntoInArea);
        if( puntoInArea === -1 || puntoInArea === 0 ){
            idLugar = key;
            return 0;
        }
    });

    return idLugar;

}

module.exports = {
    getPuntosGeograficos,
    getPuntoGeografico,
    putPuntoGeografico,
    postPuntoGeografico
}