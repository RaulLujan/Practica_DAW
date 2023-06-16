var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup

app.set('view engine', 'html');

const so = require('./js/servicios/ServicioOpiniones');
const opi = require('./js/beans/Opinion');


app.get('/', (req, res) => {
    servicio = new so.ServicioOpiniones();
    servicio.consultarOpinion("648cc6ba7726e6e4f9aa2a09")
    .then(data => data.json())
    .then(function(data) {
          var opinion = new opi.Opinion();
          opinion.fromJson(data);
          res.send(opinion.print());
    })
   .catch(err => console.log('Solicitud fallida', err));

  })

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const inc = require('./js/beans/Incidencia');


const mysql = require('mysql2');
const connection = mysql.createConnection(
      {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
      });
const sql = 'SELECT * FROM TIncidencias;';
connection.connect(function(err){
        if(err){console.log(err);}
        else{connection.query(sql ,function(err, result){
          if(err){console.log(err);}
          else{
            const listIncidencias = [];
            for (var i = 0; i < result.length; i++) {
              var incidencia = new inc.Incidencia();
              incidencia.fromJson(result[i]);
              listIncidencias.push(incidencia);
              incidencia.print();
            }
           }}); 
        }});


module.exports = app;

