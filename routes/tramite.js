const {Router} = require('express');
const { postTramite, putTramite, getTramite, getTramites, deleteTramite } = require('../controllers/tramite');

const routerTramite = Router();

routerTramite.post("/crear", postTramite );
routerTramite.put("/:id_tramite", putTramite);
routerTramite.get("/", getTramites);
routerTramite.get("/:id_tramite", getTramite);
routerTramite.delete("/:id_tramite", deleteTramite);


module.exports = routerTramite;