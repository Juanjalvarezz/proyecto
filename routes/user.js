var express = require('express');
var router = express.Router();
var usuariosController = require("../controllers/usuarios");
var validarToken = require('../authorization/validation');
var validarRol = require('../authorization/validation_rol');

//pendiente token

/* GET user listing. */
router.get('/', validarToken, validarRol("Admin"), function(req, res, next) {
   
    usuariosController.Listar(req)

    .then((respuesta)=>{
        res.render('usuarios', {respuesta: respuesta});
    })  
});

module.exports = router;