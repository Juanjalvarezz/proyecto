const connection = require ("./conexion");

class solicitantesModelo {
    Listar(){
        return new Promise ((resolve,reject)=>{
            connection.query('SELECT * FROM `solicitantes`', function (error, results, fields){
                resolve(results)
            });
        });
    }
    
    Buscar(id){
        return new Promise((resolve,reject)=>{
            connection.query('SELECT * FROM `solicitantes` WHERE `id_solicitante` = ?', [id], function (error, results, fields) {
                resolve(results)
            }); 
        })
    }

    Agregar(req){
        return new Promise ((resolve,reject)=>{
            var query = connection.query('INSERT INTO solicitantes SET ?', req, function (error, results, fields) {
                if (error) throw error;
                // Neat!
                console.log("Agregado")
                resolve("Solicitante Agregado")
            });
        }); 
    }
    Actualizar(id,req){
        return new Promise ((resolve,reject)=>{
            let cedula,nombreya,fechana,direccion,usuario,clave,telefono
            cedula= req.cedula
            nombreya=req.nombre_y_apellido

            var fechanan=req.fecha_de_nacimiento
            var valores1= fechanan.split('/')
            fechana=new Date(valores1[2],valores1[1]-1,valores1[0])
            
            direccion= req.direccion
            usuario= req.usuario
            clave= req.clave
            telefono= req.telefono
            
            var query = connection.query('UPDATE solicitantes SET cedula = ?, nombre_y_apellido = ?, fecha_de_nacimiento = ?, direccion = ?, usuario = ?, clave = ?, telefono = ? WHERE id_solicitante = ?', [cedula, nombreya, fechana, direccion, usuario, clave, telefono, id], function (error, results, fields) {
                if (error) throw error;
                // ...
                if (results.affectedRows=="0"){
                    console.log("No se ha encontrado")
                    resolve("")
                }else{
                    console.log("Se ha actualizado el solicitante con id "+id)
                    resolve("Solicitante Actualizado")
                }
            });
        }); 
    }

    Eliminar(id){
        return new Promise((resolve,reject)=>{
            connection.query('DELETE FROM solicitantes WHERE id_solicitante = "' + id + '"', function (error, results, fields) {
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

module.exports = new solicitantesModelo();
