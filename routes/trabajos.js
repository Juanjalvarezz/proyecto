var express = require('express');
var validarToken = require('../authorization/validation');
var validarRol = require('../authorization/validation_rol');
var router = express.Router();
var trabajosController = require("../controllers/trabajos");

//pendiente el token

/* GET trabajos listing. */
router.get('/', /*validarToken, validarRol(["Pt","Admin"]),*/ function(req, res, next) {
    trabajosController.Listar()
    .then((respuesta)=>{
        res.render('trabajos', {respuesta: respuesta});
    })  
});
router.get('/createt', /*validarToken, validarRol(["Pt","Admin"]),*/ function(req, res, next) {
    res.render('createt');
});
router.get('/editt/:id', /*validarToken, validarRol(["Pt","Admin"]),*/ function(req, res, next) {
    trabajosController.Buscar(req.params.id)
    .then((respuesta)=>{
        res.render('editt', {respuesta: respuesta[0]});
    })  
});
  
// POST trabajos create. Se crea al momento de crear una reserva
router.post('/',/* validarToken, validarRol("User"),*/ function(req, res, next) {

    trabajosController.Agregar(req.body)
    .then((respuesta)=>{
        console.log(respuesta)
        if(respuesta==""){
            res.render('pagina_no_contenido')
        }else{
            res.redirect('./');
        }
    })
});


/* GET trabajos search. */
router.get("/:id",/*validarToken, validarRol(["Pt","Admin"]),*/ function(req, res, next) {
    trabajosController.Buscar(req.params.id)
    .then((respuesta)=>{
        if(respuesta==""){
            res.render('pagina_no_contenido')
        }else{
            res.render('trabajos', {respuesta: respuesta});
        }
       
    })
});

/* PATCH trabajos update. */
router.post("/:id",/*validarToken, validarRol("User"),*/ function(req, res, next) {
    trabajosController.Actualizar(req.params.id , req.body)
    .then((respuesta)=>{
        if(respuesta==""){
            res.render('pagina_no_contenido')
        }else{
            res.redirect('./');
        }
    })
});

/* DELETE trabajos delete. */
router.get("/eraset/:id",/* validarToken, validarRol("User"),*/ function(req, res, next) {
    trabajosController.Eliminar(req.params.id)
    .then((respuesta)=>{
        if(respuesta==""){
            res.render('pagina_no_contenido')
        }else{
            res.redirect('../');
        }
    })
});

module.exports = router;
  
