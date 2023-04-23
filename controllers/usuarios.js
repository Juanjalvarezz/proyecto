var usuariosModelo = require('../models/usuarios')
class usuariosController {

    Login(req){
        return new Promise ((resolve, reject) => {
            usuariosModelo.Login(req)
            .then((res)=>{
                resolve(res)
            });
        })
    }
    
    Registro(req){
        return new Promise ((resolve, reject) => {
            usuariosModelo.Registro(req)
            .then((res)=>{
                resolve(res)
            });
        })
    }

    Listar(req){
        return new Promise ((resolve, reject) => {
            usuariosModelo.Listar(req)
            .then((res)=>{
                resolve(res)
            });
        })
    }
}

module.exports = new usuariosController();
