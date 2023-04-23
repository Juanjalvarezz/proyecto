const connection = require ("./conexion");
var trabajosModelo = require('../models/trabajos')

class reservasModelo {
    Listar(){
        return new Promise ((resolve,reject)=>{
            connection.query('SELECT r.id_reserva, s.nombre_y_apellido as solicitante , r.fecha_de_inicio, r.fecha_de_culminacion, r.motivo, pt.nombre_y_apellido as personal_tecnico, e.nombre as equipo, es.nombre as espacio FROM reservas r INNER JOIN solicitantes s ON r.id_solicitante = s.id_solicitante INNER JOIN personal_tecnico pt ON r.id_pt = pt.id_pt INNER JOIN equipos e ON r.id_equipo = e.id_equipo INNER JOIN espacios es ON r.id_espacio = es.id_espacio', function (error, results, fields){
                console.log(results)
                resolve(results)
            });
        });
    }
    
    Buscar(fecha){
        return new Promise((resolve,reject)=>{
            connection.query('SELECT r.id_reserva, s.nombre_y_apellido as solicitante , r.fecha_de_inicio, r.fecha_de_culminacion, r.motivo, pt.nombre_y_apellido as personal_tecnico, e.nombre as equipo, es.nombre as espacio FROM reservas r INNER JOIN solicitantes s ON r.id_solicitante = s.id_solicitante INNER JOIN personal_tecnico pt ON r.id_pt = pt.id_pt INNER JOIN equipos e ON r.id_equipo = e.id_equipo INNER JOIN espacios es ON r.id_espacio = es.id_espacio WHERE r.id_reserva = ?', [fecha], function (error, results, fields) {
               console.log(results)
                resolve(results)
            }); 
        })
    }

    mostrar_varias(fecha1,fecha2){
        return new Promise((resolve,reject)=>{
            connection.query('SELECT r.id_reserva, s.nombre_y_apellido as solicitante , r.fecha_de_inicio, r.fecha_de_culminacion, r.motivo, pt.nombre_y_apellido as personal_tecnico, e.nombre as equipo, es.nombre as espacio FROM reservas r INNER JOIN solicitantes s ON r.id_solicitante = s.id_solicitante INNER JOIN personal_tecnico pt ON r.id_pt = pt.id_pt INNER JOIN equipos e ON r.id_equipo = e.id_equipo INNER JOIN espacios es ON r.id_espacio = es.id_espacio WHERE ((r.fecha_de_inicio >= "'+fecha1+'") && (r.fecha_de_culminacion <= "'+fecha2+'"))', function (error, results, fields){                
                resolve(results)
            });
        })
    }


    Agregar(req){
        return new Promise ((resolve,reject)=>{
            var query = connection.query('INSERT INTO reservas SET ?', req, function (error, results, fields) {
                if (error) throw error;
                // Neat!
                trabajosModelos.Agregar(trabajo)
                resolve("Reserva Agregada")
            });
        }); 
        
    }
    Actualizar(id,req){
        return new Promise ((resolve,reject)=>{
            let ids,fechai,fechac,motivo,idp,ideq,ides
            ids= req.id_solicitante
            fechai=req.fecha_de_inicio
            fechac= req.fecha_de_culminacion
            motivo= req.motivo
            idp= req.id_pt
            ideq= req.id_equipo
            ides= req.id_espacio
            
            var query = connection.query('UPDATE reservas SET id_solicitante = ?, fecha_de_inicio = ?, fecha_de_culminacion = ?, motivo = ?, id_pt = ?, id_equipo = ?, id_espacio = ? WHERE id_reserva = ?', [ids, fechai, fechac, motivo, idp, ideq, ides, id], function (error, results, fields) {
                if (error) throw error;
                // ...
                if (results.affectedRows=="0"){
                    resolve("")
                }else{
                    resolve("Reserva Actualizada")
                }
            });
        }); 
    }

    Eliminar(id){
        return new Promise((resolve,reject)=>{
            connection.query('DELETE FROM reservas WHERE id_reserva = "' + id + '"', function (error, results, fields) {
                if (error){
                    resolve("error")
                } 
                if (results==""){
                    console.log("No se ha encontrado el registro")
                    resolve("")
                }else{
                    console.log("Se ha eliminado el registro con id "+id)
                    resolve("\ Eliminado")
                }
            })
        })
    }
}

module.exports = new reservasModelo();
