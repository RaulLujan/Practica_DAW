var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var su = require('./js/servicios/ServicioUsuarios');
var usu = require('./js/beans/Usuario');

var app = express();

// view engine setup

app.set('view engine', 'html');

app.get('/', (req, res) => {

    servicio = new su.ServicioUsuarios();
    servicio.consultarUsuario("6480d348e5f4150f8683f5fd")
    .then(data => data.json())
    .then(function(data) {
          var usuario = new usu.Usuario();
          usuario.fromJson(data);
          res.send(usuario.print());
    })
   .catch(err => console.log('Solicitud fallida', err));

  })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

module.exports = app;

