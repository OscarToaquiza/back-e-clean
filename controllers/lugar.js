const {response, request} = require('express');
const LugarTable = require('../models/lugar');

const getLugares = async (req = request,res = response) =>{

    const lugares = await LugarTable.findAll({
        order: ['id_lugar']
    });
    res.status(200).json({
        lugares
    });

}

module.exports = {
    getLugares
}