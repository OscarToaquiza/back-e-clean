const { response, request } = require('express');
const ProcesoReciclarTable = require('../models/procesoReciclar');
const { borrarImagen } = require('./uploads');

const getProcesosReciclar = async (req = request, res = response) => {

    const { limite = 10, desde = 0 } = req.query;

    const procesos = await ProcesoReciclarTable.findAndCountAll(
        { offset: Number(desde), limit: Number(limite) }
    );

    res.status(200).json({
        procesos
    });
}

const getProcesoReciclar = async (req = request, res = response) => {

    const id = req.params.id_proceso_reciclar;
    const proceso = await ProcesoReciclarTable.findOne({
        where: { id_proceso_reciclar: id }
    });

    res.status(200).json({
        proceso
    });
}

const putProcesoReciclar = async (req = request, res = response) => {

    const id = req.params.id_proceso_reciclar;
    const { id_proceso_reciclar, ...dataProcesoReciclar } = req.body;
    const proceso = await ProcesoReciclarTable.update(
        dataProcesoReciclar,
        {
            where: { id_proceso_reciclar: id }
        });

    res.status(200).json({
        proceso
    });
}

const postProcesoReciclar = async (req, res = response) => {

    const body = req.body;
    const proceso = new ProcesoReciclarTable(body);
    await proceso.save();

    res.status(200).json({
        proceso
    });
}

const deleteProcesoReciclar = async (req, res = response) => {

    const id = req.params.id_proceso_reciclar;

    try {
        const proceso = await ProcesoReciclarTable.findByPk(id);
        //Borrar imagen
        if (proceso.imagen) {
            const pahtImagen = `./uploads/reciclaje/${proceso.imagen}`;
            borrarImagen(pahtImagen);
        }

        const result = await ProcesoReciclarTable.destroy({
            where: { id_proceso_reciclar: proceso.id_proceso_reciclar }
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
    getProcesosReciclar,
    getProcesoReciclar,
    putProcesoReciclar,
    postProcesoReciclar,
    deleteProcesoReciclar
}