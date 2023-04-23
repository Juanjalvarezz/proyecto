var jwt = require('jsonwebtoken');

function validarToken(req, res, next ) {

    console.log('Validando Token...');

    if(!req.headers.authorization){
        //No hay token
        res.send('No hay token');
        return
    }

    //Extrayendo el token
    var token = req.headers.authorization.replace('Bearer ', '');
    
    try {
        //verificando token
        jwt.verify(token, process.env.secreto);
        next();

    } catch (error) {
        //No tienes acceso
        res.send('El token no coincide');
    }
}
module.exports = validarToken;
