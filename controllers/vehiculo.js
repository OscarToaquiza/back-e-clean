const { response, request } = require('express');
const VehiculoTable = require('../models/vehiculo');

const getVehiculos = async (req = request, res = response) => {

    const { limite = 10, desde = 0 } = req.query;

    const vehiculos = await VehiculoTable.findAndCountAll(
        { offset: Number(desde), limit: Number(limite) }
    );

    res.status(200).json({
        vehiculos
    });
}

const getVehiculo = async (req = request, res = response) => {

    const id = req.params.id_vehiculo;
    const vehiculo = await VehiculoTable.findOne({
        where: { id_vehiculo: id }
    });

    res.status(200).json({
        vehiculo
    });
}

const putVehiculo = async (req = request, res = response) => {

    const id = req.params.id_vehiculo;
    const { id_vehiculo, ...dataVehiculo } = req.body;
    const vehiculo = await VehiculoTable.update(
        dataVehiculo,
        {
            where: { id_vehiculo: id }
        });

    res.status(200).json({
        vehiculo
    });
}

const postVehiculo = async (req, res = response) => {

    const body = req.body;
    const vehiculo = new VehiculoTable(body);
    await vehiculo.save();

    res.status(200).json({
        vehiculo
    });
}

const pacthVehiculo = async (req, res = response) => {

    const id = req.params.id_vehiculo;

    try {
        //Estado 0 es baja logica
        const result = await VehiculoTable.update(
            {
                estado: "0"
            },
            {
            where: { id_vehiculo: id }
            }
        );

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
    getVehiculos,
    getVehiculo,
    putVehiculo,
    postVehiculo,
    pacthVehiculo
}