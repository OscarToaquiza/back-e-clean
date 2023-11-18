const {Router} = require('express');
const { getListaPuntos } = require('../controllers/lugarPuntoGeograficos');

const routerLugarPuntoGeografico = Router();

routerLugarPuntoGeografico.get("/:id_lugar", getListaPuntos);

module.exports = routerLugarPuntoGeografico;