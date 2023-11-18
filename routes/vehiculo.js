const {Router} = require('express');
const { postVehiculo, putVehiculo, getVehiculo, getVehiculos, pacthVehiculo } = require('../controllers/vehiculo');

const routerVehiculo = Router();

routerVehiculo.post("/crear", postVehiculo );
routerVehiculo.put("/:id_vehiculo", putVehiculo);
routerVehiculo.get("/", getVehiculos);
routerVehiculo.get("/:id_vehiculo", getVehiculo);
routerVehiculo.patch("/:id_vehiculo", pacthVehiculo)


module.exports = routerVehiculo;