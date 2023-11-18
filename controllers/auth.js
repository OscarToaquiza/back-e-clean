const { request, response } = require("express");
const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");
const UsuarioTable = require("../models/usuario");

const login = async (req = request, res = response) => {

    //Datos de body
    const { usuario, contrasenia } = req.body;

    try {

        const usuarioFind = await UsuarioTable.findOne({
            where: { usuario: usuario }
        });

        
        if (usuarioFind) {
            const validatePassword = bcryptjs.compareSync(contrasenia, usuarioFind.contrasenia);
            if (validatePassword) {
                const { contrasenia, ...dataUser } = usuarioFind.dataValues ; 
                
                //Generar JWT
                const token = await generarJWT(dataUser);

                return res.json({
                    token
                });
            }
        } 

        return res.status(400).json({
            msg: "Credenciales incorrectas"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error en el servidor"
        });
    }

}

const generarJWT = ( dataUser ) =>{
    return new Promise( (resolve, reject) =>{

        const payload = { dataUser };
        jwt.sign( payload, process.env.SECRETKEY, {
            expiresIn : '5h'
        },(err, token) => {
            if( err ){
                console.log(err);
                reject ("No se puede generar el token")
            }else{
                resolve(token) ;
            }
        });

    });
}


module.exports = {
    login
}