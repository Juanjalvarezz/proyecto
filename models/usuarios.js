const connection = require ("./conexion");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

class usuariostesModelo {

  Login(req){

    //Extrayendo valores
    let username= req.username, password= req.password
    
    //Promesa
    return new Promise ((resolve,reject)=>{
      
      //Query
      connection.query('SELECT password, rol FROM  `usuarios` WHERE `username` = ?', [username], function (error, results, fields) {
        if (error) throw error;
        
        if (results!="") {
          //Extrayendo el resultado de la Query
          let hash = results[0].password, rol=results[0].rol

          //comparando passsword
          bcrypt.compare(password, hash, function(err, result) {
            
            if(result){
              //Creando token
              jwt.sign ({roles: rol, usuario : username}, process.env.secreto, {}, function(err, token) {
                console.log ('Usuario y contrasena correctos');
              
                resolve(token);
              })
            }else{
              resolve()
            }
          });

        } else {
          resolve()
        }
        
      });
    });
  }

  Registro(req){
    let nombre,username,password
    nombre = req.nombre_y_apellido
    username=req.username
    password= req.password

    return new Promise ((resolve,reject)=>{
      //encryptando
      var saltRounds = 5
      bcrypt.hash(password, saltRounds, function(err, hash) {

        connection.query('INSERT INTO `usuarios`(`nombre_y_apellido`, `username`, `password`) VALUES ("'+nombre+'","'+username+'","'+hash+'")', function (error, results, fields) {
          if (error) throw error;

          jwt.sign ({roles: ["User"], usuario : username }, process.env.secreto , {}, function(err, token) {
            console.log (token);
            resolve(token);
          })
        });
      });
    });  
  }

  Listar(req){
    return new Promise ((resolve,reject)=>{
      //Decodificando el token
      var payload = jwt.decode(req.headers.authorization.replace('Bearer ', ''))

      
      if (payload.roles.includes("Root")) {
        console.log('Paso a Root...')
        connection.query('SELECT * FROM  `usuarios` WHERE `rol` = "Pt"', function (error, results, fields) {
          if (error) throw error;
          resolve(results)
        });

      } else if ((payload.roles.includes("User")) || (payload.roles.includes("Pt"))){
        console.log('Paso a User...')
        let username=payload.usuario
        connection.query('SELECT * FROM  `usuarios` WHERE `username` = ?', [username], function (error, results, fields) {
          if (error) throw error;
          resolve(results)
        });

      } else {
        resolve("No estas autorizado")
      }

    });
  }
  
}

module.exports = new usuariostesModelo();
