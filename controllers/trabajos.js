var trabajosModelo = require('../models/trabajos')

class trabajosController {
  
    Listar(){
        return new Promise ((resolve, reject) => {
            trabajosModelo.Listar()
            .then((res)=>{
                resolve(res)
            });
        })
    }

    Buscar(id){
        return new Promise ((resolve, reject) => {
            trabajosModelo.Buscar(id)
            .then((res)=>{
                resolve(res)
            });
        })
    } 

    Agregar(req){
        return new Promise ((resolve, reject) => {
            trabajosModelo.Agregar(req)
            .then((res)=>{
                resolve(res)
            });
        })
    }
    
    Actualizar(id,req){
        return new Promise ((resolve, reject) => {
            trabajosModelo.Actualizar(id,req)
            .then((res)=>{
                resolve(res)
            });
        })
    }
    Eliminar(id){
        return new Promise ((resolve, reject) => {
            trabajosModelo.Eliminar(id)
            .then((res)=>{
                resolve(res)
            });
        })
    } 
}


module.exports = new trabajosController();
