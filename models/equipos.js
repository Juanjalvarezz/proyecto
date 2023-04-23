const connection = require ("./conexion");

class equiposModelo {
    Listar(){
        return new Promise ((resolve,reject)=>{
            connection.query('SELECT * FROM `equipos`', function (error, results, fields){
                resolve(results)
            });
        });
    }
    
    Buscar(id){
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM `equipos` WHERE `id_equipo` = ?', [id], function (error, results, fields) {
                resolve(results)
            }); 
        })
    }

    Agregar(req){
        return new Promise ((resolve,reject)=>{
            var query = connection.query('INSERT INTO equipos SET ?', req, function (error, results, fields) {
                if (error) throw error;
                // Neat!
                console.log(query.sql);
                console.log('insert ' + results.affectedRows + ' rows'); 
                console.log("Se ha agregado un nuevo equipo")
                resolve("Equipo Agregado")
            });
        }); 
    }
    Actualizar(id,req){
        return new Promise ((resolve,reject)=>{
            let serial,nombre,descripcion,fechaad,estatus
            serial=req.serial
            nombre=req.nombre
            descripcion=req.descripcion

            var fechaan=req.fecha_de_adquisicion
            var valores1= fechaan.split('/')
            fechaad=new Date(valores1[2],valores1[1]-1,valores1[0])

            estatus=req.estatus
            
            var query = connection.query('UPDATE equipos SET serial = ?, nombre = ?, descripcion = ?, fecha_de_adquisicion = ?, estatus = ? WHERE id_equipo = ?', [serial,nombre,descripcion,fechaad,estatus, id], function (error, results, fields) {
                if (error) throw error;
                // ...
                if (results.affectedRows=="0"){
                    console.log('update ' + results.affectedRows + ' rows');
                    console.log("No se ha encontrado equipo con id "+id+" para actualizar")
                    resolve("")
                }else{
                    console.log(query.sql);
                    console.log('update ' + results.affectedRows + ' rows');
                    console.log("Se ha actualizado el equipo con id "+id)
                    resolve("Equipos Actualizado")
                }
            });
        }); 
    }

    Eliminar(id){
        return new Promise((resolve,reject)=>{
            connection.query('DELETE FROM equipos WHERE id_equipo = "'+id+'"', function (error, results, fields) {
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
module.exports = new equiposModelo();
