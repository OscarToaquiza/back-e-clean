const {Router} = require('express');
const { postFavorito, getFavoritos, getFavorito, putFavorito } = require('../controllers/favorito');

const routerFavorito = Router();

routerFavorito.post("/crear", postFavorito );
routerFavorito.put("/:id_noticia", putFavorito);
routerFavorito.get("/", getFavoritos);
routerFavorito.get("/:id_noticia", getFavoritos);


module.exports = routerFavorito;