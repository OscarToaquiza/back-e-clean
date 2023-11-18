const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const UsuarioTable = require('../models/usuario');
const { Op } = require("sequelize");

const listaRoles = [1,2,3,4,99];
/**
 * Roles a manejar: 
 * 1 admin      Puede gestionar usuario y roles.
 * 2 tecnico    No puede gestionar usuarios y roles
 * 3 chofer     Para la app movil, el admin crear
 * 4 ciudadano  Para la app movil, se registra
 * 99 borrado   Usuario borrados, bloqueados.
 */

const usuariosGet = async (req = request,res = response) =>{
    const id = req.user_id;
    const usuario = await UsuarioTable.findByPk(id);
    res.status(200).json({
        usuario
    });
}

const usuarioGetOne = async (req = request,res = response) =>{
    const id = req.params.user_id;
    const usuario = await UsuarioTable.findByPk(id);
    res.json({
        usuario
    });
}

const usuarioGetCount = async (req = request,res = response) =>{
    const usuario = await UsuarioTable.count();
    res.json({
        usuario
    });
}

const usuariosGetAll = async (req = request, res = response) => {

    const { limite = 10, desde = 0 } = req.query;
    const usuarios = await UsuarioTable.findAndCountAll(
        {
            where: {rol: { [Op.ne]: 99}},
            offset: Number(desde), 
            limit: Number(limite) 
        }
    );
    res.status(200).json({
        usuarios
    });
}



//Crear usuario
const usuariosPost = async (req,res = response) =>{

    const body = req.body;
    const usuario = new UsuarioTable( body );

    const salt = bcryptjs.genSaltSync();
    usuario.contrasenia = bcryptjs.hashSync( usuario.contrasenia, salt );
    try {
        await usuario.save();
        res.status(200).json({
            msg: 'Usuario creado de forma correcta!',
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: 'Error en Base de Datos',
        });
    }

    

}

/**
 * Actualizar data user, menos id,usuario,contraseña
 * @param {} req 
 * @param {*} res 
 */
const usuariosPut = async (req,res = response) =>{

    const id = req.params.user_id;
    const { id_usuario,usuario,contrasenia, ...dataUsuario } = req.body;
    const usuarioEdit = await UsuarioTable.update(
        dataUsuario,
        {
            where: {id_usuario: id}
        }
    );
    res.status(200).json({
        usuario: usuarioEdit
    });
}

//Solo actualizar el rol.
const usuariosPatch = async (req,res = response) =>{
    
    const id = req.params.user_id;
    const rol_user = req.body;

    if( listaRoles.includes(rol_user) ){
        const usuario = await UsuarioTable.update(
            {
                rol: rol_user
            },
            {
                where: {id_usuario: id}
            }
        );

        res.status(200).json({
            usuario
        });

    }

    res.status(400).json({
        msg: "Rol no valido"
    });
}

/**Los usuario eliminados los manejamos por rol, 99 */
const usuariosDelete = async (req,res = response) =>{
    
    const id = req.params.user_id;
    const usuario = await UsuarioTable.update(
        {
            rol: 99
        },
        {
            where: {id_usuario: id}
        }
    );

    res.status(200).json({
        usuario
    });
    
}

const usuarioGetByUsername = async (req = request,res = response) =>{
    const username = req.params.username;
    const usuario = await UsuarioTable.findOne(
        {
            where:{usuario: username }
        }
    );
    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    usuariosGetAll,
    usuarioGetOne,
    usuarioGetCount,
    usuarioGetByUsername
}