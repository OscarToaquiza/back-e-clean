const {Router} = require('express');
const { postEmpresaTipoDesperdicio, deleteEmpresaTipoDesperdicio, getEmpresaTiposDesperdicios } = require('../controllers/empresaTipoDesperdicio');

const routerEmpresaTipoDesperdicio = Router();

routerEmpresaTipoDesperdicio.post("/agregar", postEmpresaTipoDesperdicio  );
routerEmpresaTipoDesperdicio.get("/:id_empresa", getEmpresaTiposDesperdicios  );
routerEmpresaTipoDesperdicio.delete("/:id_empresa_tipo_desperdicio", deleteEmpresaTipoDesperdicio  );

module.exports = routerEmpresaTipoDesperdicio;