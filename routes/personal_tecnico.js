var express = require('express');
var validarToken = require('../authorization/validation');
var validarRol = require('../authorization/validation_rol');
var router = express.Router();
var personalController = require("../controllers/personal_tecnico");

//pendiente token

/* Listar */
router.get('/',/* validarToken, validarRol('Admin'),*/ function(req, res, next) {
    personalController.Listar()
    .then((respuesta)=>{
        res.render('personal_tecnicos', {respuesta: respuesta});
    })  
});
//nuevo
router.get('/createp', /*validarToken, validarRol(["Pt","Admin"]),*/ function(req, res, next) {
    res.render('createp');
});
router.get('/editp/:id', /*validarToken, validarRol(["Pt","Admin"]),*/ function(req, res, next) {
    personalController.Buscar(req.params.id)
    .then((respuesta)=>{
        res.render('editp', {respuesta: respuesta[0]});
    })  
});

  
/* Agregar. */
router.post('/',/* validarToken, validarRol('Admin'),*/ function(req, res, next) {
    personalController.Agregar(req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});
  
/* Buscar */
router.get("/:id",/* validarToken, validarRol('Admin'),*/ function(req, res, next) {
    personalController.Buscar(req.params.id)
    .then((respuesta)=>{
        if(respuesta==""){
            res.render('pagina_no_contenido')
        }else{
            res.render('personal_tecnicos', {respuesta: respuesta});
        }
    })
});

/* Actualizar */
router.post("/:id",/* validarToken, validarRol('Pt'),*/ function(req, res, next) {
    personalController.Actualizar(req.params.id , req.body)
    .then((respuesta)=>{
        if(respuesta==""){
            res.render('pagina_no_contenido')
        }else{
            res.redirect('./');
        }
    })
});

/* Eliminar */
router.get("/erasep/:id",/* validarToken, validarRol('Admin'),*/ function(req, res, next) {
    personalController.Eliminar(req.params.id)
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
