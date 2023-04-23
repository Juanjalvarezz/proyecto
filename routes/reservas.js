var express = require('express');
var validarToken = require('../authorization/validation');
var validarRol = require('../authorization/validation_rol');
var router = express.Router();
var reservasController = require("../controllers/reservas");

//pendiente token

router.get('/', /*validarToken,validarRol(["User","Admin"]),*/ function(req, res, next) {
    reservasController.Listar()
    .then((respuesta)=>{
        res.render('reservas', {respuesta: respuesta});
    })  
});

//nuevo
router.get('/creater', /*validarToken, validarRol(["Pt","Admin"]),*/ function(req, res, next) {
    res.render('creater');
});
router.get('/editr/:id', /*validarToken, validarRol(["Pt","Admin"]),*/ function(req, res, next) {
    reservasController.Buscar(req.params.id)
    .then((respuesta)=>{
        console.log(respuesta)
        res.render('editr', {respuesta: respuesta[0]});
    })  
});

router.post('/',/* validarToken, validarRol("User"),*/ function(req, res, next) {
    reservasController.Agregar(req.body)
    .then((respuesta)=>{
        res.send(respuesta)
    })
});

router.get('/:fecha', /*validarToken, validarRol("User"),*/ function(req, res, next){
    reservasController.Buscar(req.params.fecha)
    .then((respuesta)=>{
        if(respuesta==""){
            res.render('pagina_no_contenido')
        }else{
            res.render('reservas', {respuesta: respuesta});
        }
    })
});

router.get('/:fecha1/:fecha2', /*validarToken,  validarRol("User"),*/ function(req, res, next){
    reservasController.mostrar_varias(req.params.fecha1,req.params.fecha2)
    .then((respuesta)=>{
        if(respuesta==""){
            res.render('pagina_no_contenido')
        }else{
            res.render('reservas', {respuesta: respuesta});
        }
    })
})

router.post("/:id",/* validarToken, validarRol("User"),*/ function(req, res, next) {
    reservasController.Actualizar(req.params.id , req.body)
    .then((respuesta)=>{
        if(respuesta==""){
            res.render('pagina_no_contenido')
        }else{
            res.redirect('./');
        }
    })
});

router.get("eraser/:id",/* validarToken, validarRol("User"),*/ function(req, res, next) {

    reservasController.Eliminar(req.params.id)
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
