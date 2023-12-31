const jwt = require('jsonwebtoken');

const validarJWT = (req,res,next) =>{

    const token = req.header('x-token-epagal');
    
    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición.'
        });
    }

    try {
        const dataUser = jwt.verify( token, process.env.SECRETKEY );   
        req.user_id = dataUser.dataUser.id_usuario;
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

}

module.exports = {
    validarJWT
}