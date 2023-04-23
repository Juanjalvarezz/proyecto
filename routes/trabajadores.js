
var express = require('express');
var validarToken = require('../authorization/validation');
var validarRol = require('../authorization/validation_rol');
var router = express.Router();
var trabajadoresController = require("../controllers/trabajadores");

/* Listar */
router.get('/', function(req, res, next) {
    trabajadoresController.Listar()
    .then((respuesta)=>{
        res.render('trabajadores', {respuesta: respuesta});
    })  
});
  
/* Agregar. */
router.post('/', function(req, res, next) {
    trabajadoresController.Agregar(req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});
  
/* Buscar */
router.get('/:id', function(req, res, next) {
    trabajadoresController.Buscar(req.params.id)
    .then((respuesta)=>{
        res.render('trabajadores', {respuesta: respuesta});
    })
});

/* Actualizar */
router.patch('/:id', function(req, res, next) {
    trabajadoresController.Actualizar(req.params.id , req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

/* Eliminar */
router.delete('/:id', function(req, res, next) {
    trabajadoresController.Eliminar(req.params.id)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

module.exports = router;
