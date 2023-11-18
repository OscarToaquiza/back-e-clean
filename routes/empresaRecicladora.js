const {Router} = require('express');
const { postEmpresaRecicladora, putEmpresaRecicladora, getEmpresaRecicladora, getEmpresasRecicladoras, getListEmpresasBySector } = require('../controllers/empresaRecicladora');

const routerEmpresaRecicladora = Router();

routerEmpresaRecicladora.post("/crear", postEmpresaRecicladora  );
routerEmpresaRecicladora.put("/:id_empresa_recicladora", putEmpresaRecicladora);
routerEmpresaRecicladora.get("/", getEmpresasRecicladoras);
routerEmpresaRecicladora.get("/:id_empresa_recicladora", getEmpresaRecicladora);
routerEmpresaRecicladora.get("/sector/:id_lugar", getListEmpresasBySector);


module.exports = routerEmpresaRecicladora;