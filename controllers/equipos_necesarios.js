
var equipos_necesariosModelo = require('../models/equipos_necesarios')
class equipos_necesariosController {
  
    Listar(){
        return new Promise ((resolve, reject) => {
            equipos_necesariosModelo.Listar()
            .then((res)=>{
                resolve(res)
            });
        })
    }

    Buscar(id){
        return new Promise ((resolve, reject) => {
            equipos_necesariosModelo.Buscar(id)
            .then((res)=>{
                resolve(res)
            });
        })
    } 

    Agregar(req){
        return new Promise ((resolve, reject) => {
            equipos_necesariosModelo.Agregar(req)
            .then((res)=>{
                resolve(res)
            });
        })
    }
    
    Actualizar(id,req){
        return new Promise ((resolve, reject) => {
            equipos_necesariosModelo.Actualizar(id,req)
            .then((res)=>{
                resolve(res)
            });
        })
    }
    Eliminar(id){
        return new Promise ((resolve, reject) => {
            equipos_necesariosModelo.Eliminar(id)
            .then((res)=>{
                resolve(res)
            });
        })
    } 
}

module.exports = new equipos_necesariosController();