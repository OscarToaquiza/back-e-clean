const {Router} = require('express');
const { postProcesoReciclar, putProcesoReciclar, getProcesosReciclar, getProcesoReciclar, deleteProcesoReciclar } = require('../controllers/procesoReciclar');

const routerProcesoReciclaje = Router();

routerProcesoReciclaje.post("/crear", postProcesoReciclar );
routerProcesoReciclaje.put("/:id_proceso_reciclar", putProcesoReciclar);
routerProcesoReciclaje.get("/", getProcesosReciclar);
routerProcesoReciclaje.get("/:id_proceso_reciclar", getProcesoReciclar);
routerProcesoReciclaje.delete("/:id_proceso_reciclar", deleteProcesoReciclar);


module.exports = routerProcesoReciclaje;