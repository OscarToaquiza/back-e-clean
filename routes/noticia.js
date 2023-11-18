const {Router} = require('express');
const { postNoticia, putNoticia, getNoticia, getNoticias, deleteNoticia } = require('../controllers/noticia');

const routerNoticia = Router();

routerNoticia.post("/crear", postNoticia );
routerNoticia.put("/:id_noticia", putNoticia);
routerNoticia.get("/", getNoticias);
routerNoticia.get("/:id_noticia", getNoticia);
routerNoticia.delete("/:id_noticia", deleteNoticia)


module.exports = routerNoticia;