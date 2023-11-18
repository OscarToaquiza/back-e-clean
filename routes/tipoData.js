const {Router} = require('express');
const { getTiposDatosActivos, getTipoDato, putTipoDato, postTipoData, patchTipoData, getListaByTipo, getTiposDatosDesactivados, getAllListaByTipo } = require('../controllers/tipoDato');


const routerTipoData = Router();

routerTipoData.get("/activos", getTiposDatosActivos);
routerTipoData.get("/desactivados", getTiposDatosDesactivados );
routerTipoData.get("/:id_tipo_dato", getTipoDato);

routerTipoData.put("/:id_tipo_dato",putTipoDato );
routerTipoData.post("/crear", postTipoData );
routerTipoData.patch("/:id_tipo_dato", patchTipoData);

routerTipoData.get("/by/tipo/:tipo/:estado", getListaByTipo);

routerTipoData.get("/all/by/tipo/:tipo", getAllListaByTipo);

module.exports = routerTipoData;