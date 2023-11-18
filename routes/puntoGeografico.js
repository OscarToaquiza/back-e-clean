const {Router} = require('express');
const { postPuntoGeografico, putPuntoGeografico, getPuntoGeografico, getPuntosGeograficos } = require('../controllers/puntoGeografico');

const routerPuntoGeografico = Router();

routerPuntoGeografico.post("/crear", postPuntoGeografico );
routerPuntoGeografico.put("/:id_punto_geografico", putPuntoGeografico);
routerPuntoGeografico.get("/", getPuntosGeograficos);
routerPuntoGeografico.get("/:id_punto_geografico", getPuntoGeografico);

module.exports = routerPuntoGeografico;