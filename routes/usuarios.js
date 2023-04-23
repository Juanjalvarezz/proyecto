var express = require('express');
var router = express.Router();
var usuariosController = require("../controllers/usuarios");

//pendiente token acomodar incorrecto

/* Login. */
router.post('/login', function(req, res, next) {
  usuariosController.Login(req.body)
  .then((respuesta)=>{
    if(respuesta){
      //console.log(respuesta)
      res.render('home', {respuesta:respuesta})
      //res.send(respuesta)
    }else{
      console.log("Usuario o Contraseña Incorrecta")
      res.render('pagina_sin_permisos')
      
    }
    

    /*eso que llega guardarlo en el sessionStorage con el comando sessionStorage.setItem('token',respuesta)
     o guardar eso algun lado para luego utilizarlo para validar las session de las otras rutas  y en ves de tirar
     el render tirar res.redirect('/user') ya que no hay header o token enviados*/
    
    // res.render('home', {respuesta: respuesta});
  })
});  

/* Registro */
router.post('/registro', function(req, res, next) {
  usuariosController.Registro(req.body)
  .then((respuesta)=>{
    console.log("El usuario ha sido creado") 
    res.render('home', {respuesta:respuesta})

    //res.send(respuesta)

    /*eso que llega guardarlo en el sessionStorage con el comando sessionStorage.setItem('token',respuesta)
     o guardar eso algun lado para luego utilizarlo para validar las session de las otras rutas  y en ves de tirar
     el render tirar res.redirect('/user') ya que no hay header o token enviados*/
    
    // res.render('home', {respuesta: respuesta});
  })
});

module.exports = router;
