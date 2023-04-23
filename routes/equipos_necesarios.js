
var express = require('express');
var validarToken = require('../authorization/validation');
var validarRol = require('../authorization/validation_rol');
var router = express.Router();
var equipos_necesariosController = require("../controllers/equipos_necesarios");

/* Listar */
router.get('/', function(req, res, next) {
    equipos_necesariosController.Listar()
    .then((respuesta)=>{
        res.render('equipos_necesarios', {respuesta: respuesta});
    })  
});
  
/* Agregar. */
router.post('/', function(req, res, next) {
    equipos_necesariosController.Agregar(req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});
  
/* Buscar */
router.get('/:id', function(req, res, next) {
    equipos_necesariosController.Buscar(req.params.id)
    .then((respuesta)=>{
        res.render('equipos_necesarios', {respuesta: respuesta});
    })
});

/* Actualizar */
router.patch('/:id', function(req, res, next) {
    equipos_necesariosController.Actualizar(req.params.id , req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

/* Eliminar */
router.delete('/:id', function(req, res, next) {
    equipos_necesariosController.Eliminar(req.params.id)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

module.exports = router;
