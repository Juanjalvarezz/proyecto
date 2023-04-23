const connection = require ("./conexion");

class espaciosModelo {
    Listar(){
        return new Promise ((resolve,reject)=>{
            connection.query('SELECT * FROM `espacios`', function (error, results, fields){
                resolve(results)
            });
        });
    }
    
    Buscar(id){
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM `espacios` WHERE `id_espacio` = ?', [id], function (error, results, fields) {
                resolve(results)
            });
        })
    }

    Agregar(req){
        return new Promise ((resolve,reject)=>{
            var query = connection.query('INSERT INTO espacios SET ?', req, function (error, results, fields) {
                if (error) throw error;
                // Neat!
                console.log(query.sql);
                console.log('insert ' + results.affectedRows + ' rows'); 
                console.log("Se ha agregado un nuevo espacio")
                resolve("Espacio Agregado")
            });
        }); 
    }
    Actualizar(id,req){
        return new Promise ((resolve,reject)=>{
            let nombre,descripcion,direccion,estatus
            nombre=req.nombre
            descripcion=req.descripcion
            direccion=req.direccion
            estatus=req.estatus
            
            var query = connection.query('UPDATE espacios SET nombre = ?, descripcion = ?, direccion = ?, estatus = ? WHERE id_espacio = ?', [nombre,descripcion,direccion,estatus, id], function (error, results, fields) {
                if (error) throw error;
                // ...
                if (results.affectedRows=="0"){
                    console.log('update ' + results.affectedRows + ' rows');
                    console.log("No se ha encontrado espacio con id "+id+" para actualizar")
                    resolve("")
                }else{
                    console.log(query.sql);
                    console.log('update ' + results.affectedRows + ' rows');
                    console.log("Se ha actualizado el espacio con id "+id)
                    resolve("Espacios Actualizado")
                }
            });
        }); 
    }

    Eliminar(id){
        return new Promise((resolve,reject)=>{
            connection.query('DELETE FROM espacios WHERE id_espacio = "'+id+'"', function (error, results, fields) {
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
module.exports = new espaciosModelo();
