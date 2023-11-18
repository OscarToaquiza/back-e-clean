const {Router} = require('express');
const { postCabeceraRuta, getRutas, getRutaCompleta } = require('../controllers/cabeceraRuta');

const routerCabeceraRuta = Router();

routerCabeceraRuta.post("/crear", postCabeceraRuta );
routerCabeceraRuta.get("/", getRutas);
routerCabeceraRuta.get("/:id_cabecera_ruta", getRutaCompleta );


module.exports = routerCabeceraRuta;