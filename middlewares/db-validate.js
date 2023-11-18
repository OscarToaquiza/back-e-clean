const UsuarioTable = require("../models/usuario");

const usuarioExist = async ( usuario = '') => {
    const usuarioUnico = await UsuarioTable .findOne(
        { where: { usuario: usuario } }
    );
    if( usuarioUnico ){
        throw new Error(`El nombre de usuario ${usuario} ya está registrado!`);
    }
}

const usuarioIdExist = async ( id = '') => {
    const usuarioId = await UsuarioTable .findByPk(id);
    if( !usuarioId ){
        throw new Error(`El usuario no existe en la Base de datos!`);
    }
}

module.exports = {
    usuarioExist,
    usuarioIdExist
}