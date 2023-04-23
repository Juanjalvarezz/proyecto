
var trabajadoresModelo = require('../models/trabajadores')
class trabajadoresController {
  
    Listar(){
        return new Promise ((resolve, reject) => {
            trabajadoresModelo.Listar()
            .then((res)=>{
                resolve(res)
            });
        })
    }

    Buscar(id){
        return new Promise ((resolve, reject) => {
            trabajadoresModelo.Buscar(id)
            .then((res)=>{
                resolve(res)
            });
        })
    } 

    Agregar(req){
        return new Promise ((resolve, reject) => {
            trabajadoresModelo.Agregar(req)
            .then((res)=>{
                resolve(res)
            });
        })
    }
    
    Actualizar(id,req){
        return new Promise ((resolve, reject) => {
            trabajadoresModelo.Actualizar(id,req)
            .then((res)=>{
                resolve(res)
            });
        })
    }
    Eliminar(id){
        return new Promise ((resolve, reject) => {
            trabajadoresModelo.Eliminar(id)
            .then((res)=>{
                resolve(res)
            });
        })
    } 
}

module.exports = new trabajadoresController();
