var personalModelo = require('../models/personal_tecnico')
class personalController {
  
    Listar(){
        return new Promise ((resolve, reject) => {
            personalModelo.Listar()
            .then((res)=>{
                resolve(res)
            });
        })
    }

    Buscar(id){
        return new Promise ((resolve, reject) => {
            personalModelo.Buscar(id)
            .then((res)=>{
                resolve(res)
            });
        })
    } 

    Agregar(req){
        return new Promise ((resolve, reject) => {
            personalModelo.Agregar(req)
            .then((res)=>{
                resolve(res)
            });
        })
    }
    
    Actualizar(id,req){
        return new Promise ((resolve, reject) => {
            personalModelo.Actualizar(id,req)
            .then((res)=>{
                resolve(res)
            });
        })
    }
    Eliminar(id){
        return new Promise ((resolve, reject) => {
            personalModelo.Eliminar(id)
            .then((res)=>{
                resolve(res)
            });
        })
    } 
}

module.exports = new personalController();
