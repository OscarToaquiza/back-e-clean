const {Router} = require('express');
const expressFileUpload = require('express-fileupload');
const  {fileUpload, mostrarImagen} = require('../controllers/uploads');


const routerUploads = Router();
routerUploads.use( expressFileUpload() );

routerUploads.post("/:tipo/:id", fileUpload );
routerUploads.get("/:tipo/:nombre",  mostrarImagen );

module.exports = routerUploads;