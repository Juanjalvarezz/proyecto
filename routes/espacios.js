var express = require('express');
var validarToken = require('../authorization/validation');
var validarRol = require('../authorization/validation_rol');
var router = express.Router();
var espaciosController = require("../controllers/espacios");

//pendiente token

/* GET espacios listing. */
router.get('/', /* validarToken, validarRol(["User","Admin"]), */ function(req, res, next) {
    espaciosController.Listar()
    .then((respuesta)=>{
        res.render('espacios', {respuesta: respuesta});
    })  
});
  
//nuevo
router.get('/createes', /*validarToken, validarRol(["Pt","Admin"]),*/ function(req, res, next) {
    res.render('createes');
});
router.get('/edites/:id', /*validarToken, validarRol(["Pt","Admin"]),*/ function(req, res, next) {
    espaciosController.Buscar(req.params.id)
    .then((respuesta)=>{
        res.render('edites', {respuesta: respuesta[0]});
    })  
});


/* POST espacios create. */
router.post('/',/* validarToken, validarRol('Admin'), */function(req, res, next) {
    espaciosController.Agregar(req.body)
    .then((respuesta)=>{
        console.log(respuesta)
        if(respuesta==""){
            res.render('pagina_no_contenido')
        }else{
            res.redirect('./');
        }
    })
});
  
/* GET espacios search. */
router.get("/:id", /*validarToken, validarRol('Admin'), */function(req, res, next) {
    espaciosController.Buscar(req.params.id)
    .then((respuesta)=>{
        if(respuesta==""){
            res.render('pagina_no_contenido')
        }else{
            res.render('espacios', {respuesta: respuesta});
        }
    })
});

/* PATCH espacios update. */
router.post("/:id",/* validarToken, validarRol('Admin'), */function(req, res, next) {
    espaciosController.Actualizar(req.params.id , req.body)
    .then((respuesta)=>{
        if(respuesta==""){
            res.render('pagina_no_contenido')
        }else{
            res.redirect('./');
        }
    })
});

/* DELETE espacios delete. */
router.get("/erasees/:id", /*validarToken, validarRol('Admin'),*/ function(req, res, next) {
    espaciosController.Eliminar(req.params.id)
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
  