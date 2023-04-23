var express = require('express');
var router = express.Router();
var equiposController = require("../controllers/equipos");
var validarToken = require("../authorization/validation");
var validarRol = require('../authorization/validation_rol');


/* GET equipos listing. */
router.get('/', /*validarToken, validarRol(["User","Admin"]),*/ function(req, res, next) {
    equiposController.Listar()
    .then((respuesta)=>{
        res.render('equipos', {respuesta: respuesta});
    })  
});

//nuevo
router.get('/createeq', /*validarToken, validarRol(["Pt","Admin"]),*/ function(req, res, next) {
    res.render('createeq');
});
router.get('/editeq/:id', /*validarToken, validarRol(["Pt","Admin"]),*/ function(req, res, next) {
    equiposController.Buscar(req.params.id)
    .then((respuesta)=>{
        res.render('editeq', {respuesta: respuesta[0]});
    })  
});
  
/* POST equipos create. */
router.post('/',/* validarToken, validarRol('Admin'), */function(req, res, next) {
    equiposController.Agregar(req.body)
    .then((respuesta)=>{
        console.log(respuesta)
        if(respuesta==""){
            res.render('pagina_no_contenido')
        }else{
            res.redirect('./');
        }
    })
});
  
/* GET equipos search. */
router.get("/:id",/* validarToken, validarRol('Admin'),*/ function(req, res, next) {
    equiposController.Buscar(req.params.id)
    .then((respuesta)=>{
        if(respuesta==""){
            res.render('pagina_no_contenido')
        }else{
            res.render('equipos', {respuesta: respuesta});
        }
    })
});

/* PATCH equipos update. */
router.post("/:id",/* validarToken, validarRol('Admin'),*/ function(req, res, next) {
    equiposController.Actualizar(req.params.id , req.body)
    .then((respuesta)=>{
        if(respuesta==""){
            res.render('pagina_no_contenido')
        }else{
            res.redirect('./');
        }
    })
});

/* DELETE equipos delete. */
router.get("/eraseeq/:id",/* validarToken, validarRol('Admin'),*/ function(req, res, next) {
    equiposController.Eliminar(req.params.id)
    .then((respuesta)=>{
        if(respuesta=="error"){
            res.render('pagina_error')
        }else if(respuesta==""){
            res.render('pagina_no_contenido')
        }else{
            res.redirect('../');
        }
    })
});

module.exports = router;
  