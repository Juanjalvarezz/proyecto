var express = require('express');
var validarToken = require('../authorization/validation');
var validarRol = require('../authorization/validation_rol');
var router = express.Router();
var solicitantesController = require("../controllers/solicitantes");

//falta token

/* Listar */
router.get('/',/* validarToken, validarRol(["User","Admin"]),*/ function(req, res, next) {
    solicitantesController.Listar()
    .then((respuesta)=>{
        res.render('solicitantes', {respuesta: respuesta});
    })  
});
  
//nuevo
router.get('/creates', /*validarToken, validarRol(["Pt","Admin"]),*/ function(req, res, next) {
    res.render('creates');
});
router.get('/edits/:id', /*validarToken, validarRol(["Pt","Admin"]),*/ function(req, res, next) {
    solicitantesController.Buscar(req.params.id)
    .then((respuesta)=>{
        res.render('edits', {respuesta: respuesta[0]});
    })  
});


/* Agregar. */
router.post('/',/*validarToken,validarRol("User"),*/ function(req, res, next) {
    solicitantesController.Agregar(req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});
  
/* Buscar */
router.get("/:id",/*validarToken,validarRol("Admin"),*/ function(req, res, next) {
    solicitantesController.Buscar(req.params.id)
    .then((respuesta)=>{
        if(respuesta==""){
            res.render('pagina_no_contenido')
        }else{
            res.render('solicitantes', {respuesta: respuesta});
        }
    })
});

/* Actualizar */
router.post("/:id",/*validarToken,validarRol("User"),*/ function(req, res, next) {
    solicitantesController.Actualizar(req.params.id , req.body)
    .then((respuesta)=>{
        if(respuesta==""){
            res.render('pagina_no_contenido')
        }else{
            res.redirect('./');
        }
    })
});

/* Eliminar */
router.get("/erases/:id",/*validarToken,validarRol("User"),*/ function(req, res, next) {
    solicitantesController.Eliminar(req.params.id)
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
