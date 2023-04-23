const connection = require ("./conexion");

class administradoresModelo {
    Listar(){
        return new Promise ((resolve,reject)=>{
            connection.query('SELECT * FROM `administradores`', function (error, results, fields){
                resolve(results)
            });
        });
    }
    
    Buscar(id){
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM `administradores` WHERE `id_admin` = ?', [id], function (error, results, fields) {
                resolve(results)
            });
        })
    }

    Agregar(req){
        return new Promise ((resolve,reject)=>{
            var query = connection.query('INSERT INTO administradores SET ?', req, function (error, results, fields) {
                if (error) throw error;
                // Neat!
                console.log(query.sql);
                console.log('insert ' + results.affectedRows + ' rows'); 
                console.log("Se ha agregado un nuevo administrador")
                resolve("Administrador Agregado")
            });
        }); 
    }
    Actualizar(id,req){
        return new Promise ((resolve,reject)=>{
            let nombre,edad,cargo
            nombre=req.nombre
            edad=req.edad
            cargo=req.cargo
            
            var query = connection.query('UPDATE administradores SET nombre = ?, edad = ?, cargo = ?,  WHERE id_admin = ?', [nombre,edad,cargo, id], function (error, results, fields) {
                if (error) throw error;
                // ...
                if (results.affectedRows=="0"){
                    console.log('update ' + results.affectedRows + ' rows');
                    console.log("No se ha encontrado espacio con id "+id+" para actualizar")
                    resolve("Espacio no Existe")
                }else{
                    console.log(query.sql);
                    console.log('update ' + results.affectedRows + ' rows');
                    console.log("Se ha actualizado el espacio con id "+id)
                    resolve("administrador Actualizado")
                }
            });
        }); 
    }
    

    Eliminar(id){
        return new Promise((resolve,reject)=>{
            connection.query('DELETE FROM administradores WHERE id_admin = "'+id+'"', function (error, results, fields) {
                if (error) throw error;
                if (results.affectedRows=="0"){
                    console.log('deleted ' + results.affectedRows + ' rows');
                    console.log("No se ha encontrado administrador con id "+id+" para eliminar")
                    resolve("Administrador no Existe")
                }else{
                    console.log('deleted ' + results.affectedRows + ' rows');
                    console.log("Se ha eliminado el administrador con id "+id)
                    resolve("Administrador Eliminado")
                }
            })
        })
    }
}
module.exports = new administradoresModelo();
