var express = require('express')
var axios = require('axios');
var router = express.Router()
//var path = require('path')
//var servicio = require('./js/servicios/ServicioUsuarios')

router.get('/', function(req, res, next) {
    res.redirect('http://localhost:8090/restaurantes')
});

router.get('/restaurantes', function(req, res, next) {

    //servicio.consultarUsuario2('6480d348e5f4150f8683f5fd')
    
    axios.get('http://usuarios-rest:8081/api/usuarios/6480d348e5f4150f8683f5fd', {
      headers: {"Content-Type": "application/json", 'Access-Control-Allow-Origin': '*'},
    })
    .then(data => {
                const usuario2 = new usu.Usuario();
                usuario2.fromJson(data.json());
                usuario2.print()
            })
    .catch(err => console.log('Solicitud fallida', err));
    
    res.render('formRestaurante')
});

module.exports = router; 