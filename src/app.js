var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup

app.set('view engine', 'html');





// ##################### PRUEBAS  #####################
var su = require('./js/servicios/ServicioUsuarios');
var usu = require('./js/beans/Usuario');

app.get('/', (req, res) => {
  su.consultarUsuario3('http://usuario-rest:8081/api/usuarios/6480d348e5f4150f8683f5fd', 'GET')
  .then(data => data.json())
  .then(function(data) {
        var usuario = new usu.Usuario();
        usuario.fromJson(data);
        res.send(usuario.print());
  })
 .catch(err => console.log('Solicitud fallida', err));

})

// ##################### PRUEBAS  #####################





app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;

