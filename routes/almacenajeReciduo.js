const {Router} = require('express');
const { postAlmacenajeResiduo, putAlmacenajeResiduo, getAlmacenajesResiduos, getAlmacenajeResiduo, getListAlamcenajeResiduoBySector, getTotalAlmacenajesResiduos } = require('../controllers/almacenajeReciduo');

const routerAlmacenajeResiduos = Router();

routerAlmacenajeResiduos.post("/crear", postAlmacenajeResiduo );
routerAlmacenajeResiduos.put("/:id_almacenaje_reciduo", putAlmacenajeResiduo);
routerAlmacenajeResiduos.get("/", getAlmacenajesResiduos);
routerAlmacenajeResiduos.get("/:id_almacenaje_reciduo", getAlmacenajeResiduo);

routerAlmacenajeResiduos.get("/sector/:id_lugar", getListAlamcenajeResiduoBySector);
routerAlmacenajeResiduos.get("/total/contenedores", getTotalAlmacenajesResiduos);

module.exports = routerAlmacenajeResiduos;