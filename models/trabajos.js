const connection = require ("./conexion");

class trabajosModelo {
    Listar(){
        return new Promise ((resolve,reject)=>{
            connection.query('SELECT t.id_trabajo, t.fecha_de_inicio, t.fecha_de_culminacion, pt.nombre_y_apellido as personal_tecnico, r.motivo as motivo, e.nombre as equipo, t.trabajo FROM trabajos t INNER JOIN personal_tecnico pt ON t.id_pt = pt.id_pt INNER JOIN reservas r ON t.id_reserva = r.id_reserva INNER JOIN equipos e ON t.id_equipo = e.id_equipo', function (error, results, fields){
                resolve(results)
            });
        });
    }
    
    Buscar(id){
        return new Promise((resolve,reject)=>{
            connection.query('SELECT t.id_trabajo, t.fecha_de_inicio, t.fecha_de_culminacion, pt.nombre_y_apellido as personal_tecnico, r.motivo as motivo, e.nombre as equipo, t.trabajo FROM trabajos t INNER JOIN personal_tecnico pt ON t.id_pt = pt.id_pt INNER JOIN reservas r ON t.id_reserva = r.id_reserva INNER JOIN equipos e ON t.id_equipo = e.id_equipo WHERE id_trabajo = ?', [id], function (error, results, fields) {
               resolve(results)
            }); 
        })
    }

    Agregar(req){
        return new Promise ((resolve,reject)=>{
            let trabajo={}
            trabajo.fecha_de_inicio=req.fecha_de_inicio
            trabajo.fecha_de_culminacion=req.fecha_de_culminacion
            trabajo.id_pt=req.id_pt
            trabajo.id_reserva=req.id_reserva
            trabajo.id_equipo=req.id_equipo
            trabajo.trabajo=req.trabajo

            var query = connection.query('INSERT INTO trabajos SET ?', trabajo, function (error, results, fields) {
                if (error){ 
                    resolve ("")
                }else{// Neat!
                console.log(query.sql);
                console.log("Se ha agregado un nuevo registro")
                resolve("Registro Agregado")
                }
            });
        }); 
    }
    Actualizar(id,req){
        return new Promise ((resolve,reject)=>{
            let fechac,fechai,pt,reserva,equipo,t

            var fechain=req.fecha_de_inicio
            var valores1= fechain.split('/')
            fechai=new Date(valores1[2],valores1[1]-1,valores1[0])

            var fechacn = req.fecha_de_culminacion
            var valores2= fechacn.split('/')
            fechac= new Date(valores2[2],valores2[1]-1,valores2[0])

            pt= req.id_pt
            reserva= req.id_reserva
            equipo= req.id_equipo
            t= req.trabajo
            
            var query = connection.query('UPDATE trabajos SET fecha_de_inicio = ?, fecha_de_culminacion = ?, id_pt = ?, id_reserva = ?, id_equipo = ?, trabajo = ? WHERE id_trabajo = ?', [fechai,fechac,pt,reserva,equipo,t, id], function (error, results, fields) {
                if (error) throw error;
                // ...
                if (results.affectedRows=="0"){
                    console.log('update ' + results.affectedRows + ' rows');
                    console.log("No se ha encontrado registro con id "+id+" para actualizar")
                    resolve("")
                }else{
                    console.log(query.sql);
                    console.log('update ' + results.affectedRows + ' rows');
                    console.log("Se ha actualizado el registro con id "+id)
                    resolve("Registro Actualizado")
                }
            });
        }); 
    }

    Eliminar(id){
        return new Promise((resolve,reject)=>{
            connection.query('DELETE FROM trabajos WHERE id_trabajo = "'+id+'"', function (error, results, fields) {
                if (error) throw error;
                if (results.affectedRows=="0"){
                    console.log('deleted ' + results.affectedRows + ' rows');
                    console.log("No se ha encontrado registro con id "+id+" para eliminar")
                    resolve("")
                }else{
                    console.log('deleted ' + results.affectedRows + ' rows');
                    console.log("Se ha eliminado el registro con id "+id)
                    resolve("Registro Eliminado")
                }
            })
        })
    }
}

module.exports = new trabajosModelo();
