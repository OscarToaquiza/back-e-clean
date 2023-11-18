const { Router } = require('express'); 
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch, usuariosGetAll, usuarioGetOne, usuarioGetCount, usuarioGetByUsername } = require('../controllers/usuarios');
const { usuarioExist } = require('../middlewares/db-validate');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validateFields } = require('../middlewares/validate-fields');

const routerUsuario = Router();

routerUsuario.post("/register",[
    check('nombre','El nombre es un campo obligatorio').not().isEmpty(),
    check('apellido','El apellido es un campo obligatorio').not().isEmpty(),
    check('usuario','El usuario es obligatorio').not().isEmpty(),
    check('contrasenia','La contraseña es un campo obligatorio').not().isEmpty(),
    check('usuario').custom( usuarioExist ),
    validateFields
], usuariosPost);

routerUsuario.get("/data/user/by/token", validarJWT ,usuariosGet );

routerUsuario.get("/get/:user_id", usuarioGetOne);
routerUsuario.get("/get/by/username/:username", usuarioGetByUsername);

routerUsuario.put("/:user_id", usuariosPut);
routerUsuario.patch("/:user_id", usuariosPatch);
routerUsuario.delete("/:user_id",usuariosDelete);

routerUsuario.get("/lista",usuariosGetAll);
routerUsuario.get("/contar",usuarioGetCount);

module.exports = routerUsuario;