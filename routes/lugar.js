const {Router} = require('express');
const { getLugares } = require('../controllers/lugar');

const routerLugar = Router();

routerLugar.get("/", getLugares);

module.exports = routerLugar;