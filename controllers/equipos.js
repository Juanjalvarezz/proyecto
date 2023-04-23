var equiposModelo = require('../models/equipos')

class equiposController {
  
    Listar(){
        return new Promise ((resolve, reject) => {
            equiposModelo.Listar()
            .then((res)=>{
                resolve(res)
            });
        })
    }

    Buscar(id){
        return new Promise ((resolve, reject) => {
            equiposModelo.Buscar(id)
            .then((res)=>{
                resolve(res)
            });
        })
    } 

    Agregar(req){
        return new Promise ((resolve, reject) => {
            equiposModelo.Agregar(req)
            .then((res)=>{
                resolve(res)
            });
        })
    }
    
    Actualizar(id,req){
        return new Promise ((resolve, reject) => {
            equiposModelo.Actualizar(id,req)
            .then((res)=>{
                resolve(res)
            });
        })
    }
    Eliminar(id){
        return new Promise ((resolve, reject) => {
            equiposModelo.Eliminar(id)
            .then((res)=>{
                resolve(res)
            });
        })
    } 
}


module.exports = new equiposController();
