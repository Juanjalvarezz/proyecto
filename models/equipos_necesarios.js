const connection = require ("./conexion");

class equipos_necesariosModelo {
    Listar(){
        return new Promise ((resolve,reject)=>{
            connection.query('SELECT * FROM `equipos_necesarios`', function (error, results, fields){
                resolve(results)
            });
        });
    }
    
    Buscar(id){
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM `equipos_necesarios` WHERE `id_eqnes` = ?', [id], function (error, results, fields) {
                resolve(results)
            });
        })
    }

    Agregar(req){
        return new Promise ((resolve,reject)=>{
            var query = connection.query('INSERT INTO equipos_necesarios SET ?', req, function (error, results, fields) {
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
            let nombre,descripcion,costo
            nombre=req.nombre
            descripcion=req.descripcion
            costo=req.costo
            
            var query = connection.query('UPDATE equipos_necesarios SET nombre = ?, descripcion = ?, costo = ?,  WHERE id_eqnes = ?', [nombre,descripcion,costo, id], function (error, results, fields) {
                if (error) throw error;
                // ...
                if (results.affectedRows=="0"){
                    console.log('update ' + results.affectedRows + ' rows');
                    console.log("No se ha encontrado equipo con id "+id+" para actualizar")
                    resolve("Equipo no Existe")
                }else{
                    console.log(query.sql);
                    console.log('update ' + results.affectedRows + ' rows');
                    console.log("Se ha actualizado el equipo con id "+id)
                    resolve("Equipo Actualizado")
                }
            });
        }); 
    }

    Eliminar(id){
        return new Promise((resolve,reject)=>{
            connection.query('DELETE FROM equipos_necesarios WHERE id_eqnes = "'+id+'"', function (error, results, fields) {
                if (error) throw error;
                if (results.affectedRows=="0"){
                    console.log('deleted ' + results.affectedRows + ' rows');
                    console.log("No se ha encontrado equipo con id "+id+" para eliminar")
                    resolve("Equipo no Existe")
                }else{
                    console.log('deleted ' + results.affectedRows + ' rows');
                    console.log("Se ha eliminado el equipo con id "+id)
                    resolve("Equipo Eliminado")
                }
            })
        })
    }
}
module.exports = new equipos_necesariosModelo();
