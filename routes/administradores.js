var express = require('express');
var validarToken = require('../authorization/validation');
var validarRol = require('../authorization/validation_rol');
var router = express.Router();
var administradoresController = require("../controllers/administradores");

/* Listar */
router.get('/', function(req, res, next) {
    administradoresController.Listar()
    .then((respuesta)=>{
        res.render('administradores', {respuesta: respuesta});
    })  
});
  
/* Agregar. */
router.post('/', function(req, res, next) {
    administradoresController.Agregar(req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});
  
/* Buscar */
router.get('/:id', function(req, res, next) {
    administradoresController.Buscar(req.params.id)
    .then((respuesta)=>{
        res.render('administradores', {respuesta: respuesta});
    })
});

/* Actualizar */
router.patch('/:id', function(req, res, next) {
    administradoresController.Actualizar(req.params.id , req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

/* Eliminar */
router.delete('/:id', function(req, res, next) {
    administradoresController.Eliminar(req.params.id)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

module.exports = router;
