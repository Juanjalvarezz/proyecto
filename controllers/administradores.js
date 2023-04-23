
var administradoresModelo = require('../models/administradores')
class administradoresController {
  
    Listar(){
        return new Promise ((resolve, reject) => {
            administradoresModelo.Listar()
            .then((res)=>{
                resolve(res)
            });
        })
    }

    Buscar(id){
        return new Promise ((resolve, reject) => {
            administradoresModelo.Buscar(id)
            .then((res)=>{
                resolve(res)
            });
        })
    } 

    Agregar(req){
        return new Promise ((resolve, reject) => {
            administradoresModelo.Agregar(req)
            .then((res)=>{
                resolve(res)
            });
        })
    }
    
    Actualizar(id,req){
        return new Promise ((resolve, reject) => {
            administradoresModelo.Actualizar(id,req)
            .then((res)=>{
                resolve(res)
            });
        })
    }
    Eliminar(id){
        return new Promise ((resolve, reject) => {
            administradoresModelo.Eliminar(id)
            .then((res)=>{
                resolve(res)
            });
        })
    } 
}

module.exports = new administradoresController();
