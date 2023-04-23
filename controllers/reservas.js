var reservasModelo = require('../models/reservas')
class reservasController {
  
    Listar(){
        return new Promise ((resolve, reject) => {
            reservasModelo.Listar()
            .then((res)=>{
                resolve(res)
            });
        })
    }

    Buscar(fecha){
        return new Promise ((resolve, reject) => {
            reservasModelo.Buscar(fecha)
            .then((res)=>{
                resolve(res)
            });
        })
    } 

    mostrar_varias(fecha1,fecha2){
        return new Promise((resolve,reject)=>{
            reservasModelo.mostrar_varias(fecha1,fecha2)
            .then((res)=>{
                resolve(res)
            });
        })
    }

    Agregar(req){
        return new Promise ((resolve, reject) => {
            reservasModelo.Agregar(req)
            .then((res)=>{
                resolve(res)
            });
        })
    }
    
    Actualizar(id,req){
        return new Promise ((resolve, reject) => {
            reservasModelo.Actualizar(id,req)
            .then((res)=>{
                resolve(res)
            });
        })
    }
    Eliminar(id){
        return new Promise ((resolve, reject) => {
            reservasModelo.Eliminar(id)
            .then((res)=>{
                resolve(res)
            });
        })
    } 
}

module.exports = new reservasController();
