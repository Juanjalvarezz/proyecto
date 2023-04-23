var jwt = require('jsonwebtoken');

const validarRol = (roles) => (req, res, next ) => {

    console.log('Validando Rol...');

    try {
        //Extrayendo el token
       let payload= jwt.decode(req.headers.authorization.replace('Bearer ', ''));
       let rol=roles.find(e => e == payload.roles)

       //Comparando roles
       if(rol == payload.roles){
        next();
       }else{
        res.send("No tiene permisos")
       }

    } catch (error) {

        //No tienes acceso
        res.send('No tiene acceso');
    }
}

module.exports = validarRol;
