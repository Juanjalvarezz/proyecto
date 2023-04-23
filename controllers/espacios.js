var espaciosModelo = require('../models/espacios')

class espaciosController {
  
    Listar(){
        return new Promise ((resolve, reject) => {
            espaciosModelo.Listar()
            .then((res)=>{
                resolve(res)
            });
        })
    }

    Buscar(id){
        return new Promise ((resolve, reject) => {
            espaciosModelo.Buscar(id)
            .then((res)=>{
                resolve(res)
            });
        })
    } 

    Agregar(req){
        return new Promise ((resolve, reject) => {
            espaciosModelo.Agregar(req)
            .then((res)=>{
                resolve(res)
            });
        })
    }
    
    Actualizar(id,req){
        return new Promise ((resolve, reject) => {
            espaciosModelo.Actualizar(id,req)
            .then((res)=>{
                resolve(res)
            });
        })
    }
    Eliminar(id){
        return new Promise ((resolve, reject) => {
            espaciosModelo.Eliminar(id)
            .then((res)=>{
                resolve(res)
            });
        })
    } 
}


module.exports = new espaciosController();
