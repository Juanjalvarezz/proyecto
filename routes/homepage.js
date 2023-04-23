var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('inicio');
});

/* Registro */
router.get('/registro', function(req, res, next) {
  res.render('registro');
});

/* Sobre Nosotros */
router.get('/informacion', function(req, res, next) {
  res.render('inf');
});
module.exports = router;
