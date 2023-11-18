const { response, request } = require('express');
const moment = require('moment');
const { QueryTypes } = require('sequelize');
const lodash = require('lodash');
const NotificacionProblemaTabla = require('../models/notificacionProblema');

const getNotificaciones = async (req = request, res = response) => {

    const { limite = 10, desde = 0 } = req.query;

    const notificaciones = await NotificacionProblemaTabla.findAndCountAll(
        { offset: Number(desde), limit: Number(limite) }
    );

    res.status(200).json({
        notificaciones
    });
}


const getNotificacionesTabla = async (req = request, res = response) => {

    const { limite = 10, desde = 0 } = req.query;

    const rows = await NotificacionProblemaTabla.sequelize.query(
        `select    
            n.id_notificacion_problema,
            n.estado,
            n.fecha,
            l2.nombre as sector,
            td.nombre as tipo_dato 
        from notificacionproblema n
          left join puntogeografico p2 on n.id_punto_geografico = p2.id_punto_geografico 
          left join lugar l2 on p2.id_lugar = l2.id_lugar 
          left join tipo_dato td on td.id_tipo_dato = n.id_tipo_notificacion order by fecha desc
        limit ${limite} offset ${desde} `,
        { type: QueryTypes.SELECT }
    );

    const count = await NotificacionProblemaTabla.sequelize.query(
        `SELECT count(*) FROM notificacionproblema;`,
        { type: QueryTypes.SELECT }
    );

    let notificaciones = {
        count: count[0].count,
        rows
    }


    res.status(200).json({
        notificaciones
    });
}

const getNotificacion = async (req = request, res = response) => {

    const id = req.params.id_notificacion_problema;
    const notificacion = await NotificacionProblemaTabla.sequelize.query(
        `select 
        n.id_notificacion_problema,
        n.descripcion,
        n.fecha,
        n.imagen,
        p2.latitud, 
        p2.longitud, 
        td.nombre as nombre_tipo,
        u2.nombre,
        u2.apellido,
        u2.id_usuario,
        l2.nombre as sector 
        from notificacionproblema n 
        left join puntogeografico p2 on n.id_punto_geografico = p2.id_punto_geografico
        left join lugar l2 on p2.id_lugar = l2.id_lugar 
        left join tipo_dato td on n.id_tipo_notificacion = td.id_tipo_dato 
        left join usuario u2 on n.id_usuario = u2.id_usuario 
        where n.id_notificacion_problema = ${id};`,
        { type: QueryTypes.SELECT }
    )

    res.status(200).json({
        notificacion
    });
}

const getListNotificacionesHoy = async (req, res = response) => {

    const fecha = moment().format("YYYY-MM-DD");
    try {

        const totalNotificaciones = await NotificacionProblemaTabla.sequelize.query(
            `select count(*) 
        from notificacionproblema np  
        left join puntogeografico p2 on np.id_punto_geografico = p2.id_punto_geografico
        left join lugar l2 on p2.id_lugar = l2.id_lugar 
        left join tipo_dato td on np.id_tipo_notificacion = td.id_tipo_dato 
        where np.fecha = '${fecha}';`,
            { type: QueryTypes.SELECT }
        );

        res.status(200).json({
            totalNotificaciones: totalNotificaciones[0].count,
            fecha
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            totalNotificaciones: 0,
            fecha
        });
    }
}

/**
 * Obtner la lista de notificaciones de un lugar especifico, con sus respectivas coordenadas
 * @param {id_lugar} req 
 * @param {json} res 
 */
const getListNotificacionesBySector = async (req, res = response) => {
    const id = req.params.id_lugar;
    const fecha = moment().format("YYYY-MM-DD");

    const listaNotificaciones = await NotificacionProblemaTabla.sequelize.query(
        `select 
        np.id_notificacion_problema,
        np.estado,
        np.fecha,
        td.nombre ,
        p2.longitud,
        p2.latitud 
    from notificacionproblema np  
        left join puntogeografico p2 on np.id_punto_geografico = p2.id_punto_geografico
        left join lugar l2 on p2.id_lugar = l2.id_lugar 
        left join tipo_dato td on np.id_tipo_notificacion = td.id_tipo_dato 
    where and l2.id_lugar = ${id} and np.fecha = '${fecha}';`,
        { type: QueryTypes.SELECT }
    );

    res.status(200).json({
        listaNotificaciones
    });
}

const getListNotificacionesBySectorAndFecha = async (req, res = response) => {

    const { id, fecha } = req.query;
    const listaNotificaciones = await NotificacionProblemaTabla.sequelize.query(
        `select 
        np.id_notificacion_problema,
        np.estado,
        np.fecha,
        td.nombre ,
        p2.longitud,
        p2.latitud 
    from notificacionproblema np  
        left join puntogeografico p2 on np.id_punto_geografico = p2.id_punto_geografico
        left join lugar l2 on p2.id_lugar = l2.id_lugar 
        left join tipo_dato td on np.id_tipo_notificacion = td.id_tipo_dato 
    where l2.id_lugar = ${id} and np.fecha = '${fecha}';`,
        { type: QueryTypes.SELECT }
    );

    res.status(200).json({
        listaNotificaciones
    });
}


const getListNotificacionesBySectorFecha = async (req, res = response) => {
    const id = req.params.id_lugar;

    let startOfWeek = moment().startOf("week").format("YYYY-MM-DD");
    let endOfWeek = moment().endOf("week").format("YYYY-MM-DD");

    const listaNotificaciones = await NotificacionProblemaTabla.sequelize.query(
        ` select
        np.id_notificacion_problema,
        np.estado,
        np.fecha
    from notificacionproblema np
        left join puntogeografico p2 on np.id_punto_geografico = p2.id_punto_geografico
        left join lugar l2 on p2.id_lugar = l2.id_lugar
        left join tipo_dato td on np.id_tipo_notificacion = td.id_tipo_dato
    where l2.id_lugar = ${id} and np.fecha >= '${startOfWeek}' and np.fecha <= '${endOfWeek}';
    `,
        { type: QueryTypes.SELECT }
    );

    let lista = new Array();

    for (let i = 0; i < 7; i++) {
        let fechaDia = moment().startOf("week").add(i, 'days').format("YYYY-MM-DD");
        let numeroNotificaciones = 0;
        let numeroNotificacionesResueltas = 0;
        listaNotificaciones.forEach(dia => {
            if (dia.fecha === fechaDia.toString()) {
                if( dia.estado == 1 ){
                    numeroNotificaciones++;
                }else if (dia.estado == 2) {
                    numeroNotificacionesResueltas++;
                }
            }
        });
        let datosDia = {
            dia: i,
            fecha: fechaDia,
            numeroNotificaciones,
            numeroNotificacionesResueltas
        }
        lista.push(datosDia);
    }


    res.status(200).json({
        lista
    });
}

const getListNotificacionesReporte = async (req, res = response) => {
    
    const id_lugar = req.body.id_lugar;
    const fecha_inicio = req.body.fecha_inicio;
    const fecha_fin = req.body.fecha_fin;

    let lugar = "";
    let fechaInicio = "";
    let fechaFin = "";
    if(id_lugar != 0){
        lugar = `and l2.id_lugar = ${id_lugar}`;
    }
    if(fecha_inicio != null ){
        fechaInicio = `and np.fecha >= '${fecha_inicio}'`;
    }
    if(fecha_fin != null ){
        fechaFin = `and np.fecha <= '${fecha_fin}'`;
    }

    const listaNotificaciones = await NotificacionProblemaTabla.sequelize.query(
        `  	
    select
        np.id_notificacion_problema,
        np.estado,
        np.fecha 
    from notificacionproblema np
        left join puntogeografico p2 on np.id_punto_geografico = p2.id_punto_geografico 
        left join lugar l2 on p2.id_lugar = l2.id_lugar 
    where 1=1 ${lugar} ${fechaInicio} ${fechaFin} 
    order by np.fecha;
    `,
        { type: QueryTypes.SELECT }
    );

    let lista = lodash.groupBy(listaNotificaciones, 'fecha');

    let listaFechas = new Array();
    let listaValores = new Array();

    Object.keys(lista).map( (key) => {
        listaFechas.push(key);
        listaValores.push(lista[key].length);
    });
        

    res.status(200).json({
        listaFechas,
        listaValores
    });
}


const postNotificacion = async (req, res = response) => {

    const body = req.body;
    const notificacion = new NotificacionProblemaTabla(body);
    await notificacion.save();

    res.status(200).json({
        notificacion
    });
}

const pathNotificacionEstado = async (req, res = response) => {

    const { id_notificacion, estado } = req.body;
    const notificacion = await NotificacionProblemaTabla.update(
        {estado},
        {
            where: {id_notificacion_problema: id_notificacion}
        }
    );

    res.status(200).json({
        notificacion
    });
}

module.exports = {
    postNotificacion,
    getNotificaciones,
    getNotificacion,
    getListNotificacionesBySector,
    getListNotificacionesBySectorFecha,
    getListNotificacionesHoy,
    getListNotificacionesReporte,
    getListNotificacionesBySectorAndFecha,
    pathNotificacionEstado,
    getNotificacionesTabla
}