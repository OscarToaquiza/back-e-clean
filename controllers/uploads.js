const fs = require("fs");
const path = require("path");

const { response, request } = require('express');
const { v4: uuidv4 } = require('uuid');

const NoticiaTable = require('../models/noticia');
const UsuarioTable = require("../models/usuario");
const NotificacionProblemaTabla = require("../models/notificacionProblema");
const ProcesoReciclarTable = require("../models/procesoReciclar");
const EmpresaRecicladoraTable = require("../models/empresaRecicladora");

const fileUpload = (req = request, res = response) => {
    console.log("FileUpload");
    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['noticias','usuarios','notificaciones','reciclaje','empresa'];
    if(! tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: false,
            msg: "Tipo de entidad no válido ("+tipo+") "
        });
    }

    //Validar qeu exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg: "No hay ningun archivo"
        });
    }

    //Procesar la imagen...
    const file = req.files.imagen;
    const nombreCortado = file.name.split(".");
    const extensionArchivo = nombreCortado[nombreCortado.length-1];

    //Validar extension
    const extensionesValidas = ["png","jpg","jpeg","gif","PNG"];
    if( !extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg: "Extension no válida"
        });
    }

    //Generar el nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, (err) => {

        if(err){
            console.log(err);
            return res.status(500).json({
                ok:false,
                msg: "Error al mover a imagen"
            });
        }

        //Actualizar la BD.
        actualizarImagen(tipo,id,nombreArchivo);

        res.json({
            ok:true,
            msg: "Archivo subido",
            nombreArchivo
        });

    });


}


const actualizarImagen = async (tipo, id, nombreArchivo)=> {
    
    let pahtAntiguo = '';
    switch (tipo) {
        case "noticias":
            
            const noticia = await NoticiaTable.findByPk(id);
            if( !noticia ){
                console.log("No se encontro la noticia en BD");
                return false;
            }

            pahtAntiguo = `./uploads/noticias/${noticia.imagen}`;
            borrarImagen(pahtAntiguo);

            noticia.imagen = nombreArchivo;
            await noticia.save();
            return true;

        break;

        case "reciclaje":
            
            const proceso = await ProcesoReciclarTable.findByPk(id);
            if( !proceso ){
                console.log("No se encontro la proceso de reciclaje en BD");
                return false;
            }

            pahtAntiguo = `./uploads/reciclaje/${proceso.imagen}`;
            borrarImagen(pahtAntiguo);

            proceso.imagen = nombreArchivo;
            await proceso.save();
            return true;

        break;
        
        case "notificaciones":
            
            const notificacion = await NotificacionProblemaTabla.findByPk(id);
            if( !notificacion ){
                console.log("No se encontro la notificacion en BD");
                return false;
            }

            pahtAntiguo = `./uploads/notificaciones/${notificacion.imagen}`;
            borrarImagen(pahtAntiguo);

            notificacion.imagen = nombreArchivo;
            await notificacion.save();
            return true;

        break;

        case "usuarios":

            const usuario = await UsuarioTable.findByPk(id);
            if( !usuario ){
                console.log("No se encontro el usuario en BD");
                return false;
            }

            pahtAntiguo = `./uploads/usuarios/${usuario.imagen_perfil}`;
            borrarImagen(pahtAntiguo);

            usuario.imagen_perfil = nombreArchivo;
            await usuario.save();
            return true;

        break;

        case "empresa":

            const empresa = await EmpresaRecicladoraTable.findByPk(id);
            if( !empresa ){
                console.log("No se encontro la empresa en BD");
                return false;
            }

            pahtAntiguo = `./uploads/empresa/${empresa.imagen}`;
            borrarImagen(pahtAntiguo);

            empresa.imagen = nombreArchivo;
            await empresa.save();
            return true;

        break;
    }

}

const borrarImagen = ( path )=>{
     //Verificar y eliminar la imagen de carpeta
     if(fs.existsSync(path)){
        fs.unlinkSync(path);
    }
}


const mostrarImagen = (req = request, res = response) => {

    const tipo = req.params.tipo;
    const nombre = req.params.nombre;

    const pathImg = path.join( __dirname, `../uploads/${tipo}/${nombre}` );

    if( fs.existsSync(pathImg) ){
        res.sendFile( pathImg);
    } else {
        //Imagen por defecto de EPAGAL?:
        //Para users:
        if( tipo == "usuarios" ){
            const pathDefault =  path.join( __dirname, `../uploads/usuarios/user_default.png` );
            res.sendFile(pathDefault);
        }
        const pathDefault =  path.join( __dirname, `../uploads/no-image.png` );
        res.sendFile(pathDefault);
    }

}


module.exports = {
    fileUpload,
    mostrarImagen,
    borrarImagen
}