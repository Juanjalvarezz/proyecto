const connection = require ("./conexion");

class trabajadoresModelo {
    Listar(){
        return new Promise ((resolve,reject)=>{
            connection.query('SELECT * FROM `trabajadores`', function (error, results, fields){
                resolve(results)
            });
        });
    }
    
    Buscar(id){
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM `trabajadores` WHERE `id_trabajadores` = ?', [id], function (error, results, fields) {
                resolve(results)
            });
        })
    }

    Agregar(req){
        return new Promise ((resolve,reject)=>{
            var query = connection.query('INSERT INTO trabajadores SET ?', req, function (error, results, fields) {
                if (error) throw error;
                // Neat!
                console.log(query.sql);
                console.log('insert ' + results.affectedRows + ' rows'); 
                console.log("Se ha agregado un nuevo trabajador")
                resolve("Trabajador Agregado")
            });
        }); 
    }
    Actualizar(id,req){
        return new Promise ((resolve,reject)=>{
            let nombre,edad,especialidad
            nombre=req.nombre
            edad=req.edad
            especialidad=req.especialidad
            
            var query = connection.query('UPDATE trabajadores SET nombre = ?, edad = ?, especialidad = ?,  WHERE id_trabajadores = ?', [nombre,edad,especialidad, id], function (error, results, fields) {
                if (error) throw error;
                // ...
                if (results.affectedRows=="0"){
                    console.log('update ' + results.affectedRows + ' rows');
                    console.log("No se ha encontrado trabajador con id "+id+" para actualizar")
                    resolve("trabajador no Existe")
                }else{
                    console.log(query.sql);
                    console.log('update ' + results.affectedRows + ' rows');
                    console.log("Se ha actualizado el trabajador con id "+id)
                    resolve("trabajador Actualizado")
                }
            });
        }); 
    }
    

    Eliminar(id){
        return new Promise((resolve,reject)=>{
            connection.query('DELETE FROM trabajadores WHERE id_trabajadores = "'+id+'"', function (error, results, fields) {
                if (error) throw error;
                if (results.affectedRows=="0"){
                    console.log('deleted ' + results.affectedRows + ' rows');
                    console.log("No se ha encontrado trabajador con id "+id+" para eliminar")
                    resolve("trabajador no Existe")
                }else{
                    console.log('deleted ' + results.affectedRows + ' rows');
                    console.log("Se ha eliminado el trabajador con id "+id)
                    resolve("trabajador Eliminado")
                }
            })
        })
    }
}
module.exports = new trabajadoresModelo();
