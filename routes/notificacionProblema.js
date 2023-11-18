const {Router} = require('express');
const { postNotificacion, getNotificacion, getNotificaciones, getListNotificacionesBySector, getListNotificacionesBySectorFecha, getListNotificacionesHoy, getListNotificacionesReporte, getListNotificacionesBySectorAndFecha, pathNotificacionEstado, getNotificacionesTabla } = require('../controllers/notificacionProblema');

const routerNotificacion = Router();

routerNotificacion.post("/crear", postNotificacion );
routerNotificacion.get("/", getNotificaciones);
routerNotificacion.get("/sector/:id_lugar", getListNotificacionesBySector);
routerNotificacion.get("/sector/semana/:id_lugar", getListNotificacionesBySectorFecha);
routerNotificacion.get("/:id_notificacion_problema", getNotificacion);
routerNotificacion.get("/fecha-actual/general", getListNotificacionesHoy);
routerNotificacion.post("/reporte/notificacion", getListNotificacionesReporte);
routerNotificacion.get("/sector/fecha/semana/dia", getListNotificacionesBySectorAndFecha);
routerNotificacion.patch("/cambiar/estado", pathNotificacionEstado);
routerNotificacion.get("/tabla/lista", getNotificacionesTabla);

module.exports = routerNotificacion;