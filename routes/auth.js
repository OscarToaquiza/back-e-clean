const {Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');

const authUsuario = Router();

authUsuario.post("/login",[
    check("usuario","El usuario es obligatorio").not().isEmpty(),
    check("contrasenia","La contraseña es obligatoria").not().isEmpty(),
    validateFields
], login);


module.exports = authUsuario;