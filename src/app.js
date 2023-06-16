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


const si = require('./js/servicios/ServicioIncidencias');
const inc = require('./js/beans/Incidencia');


const incidencia = new inc.Incidencia();
incidencia.idUser = "2";
incidencia.idRestaurante = "2";
incidencia.nombrePlato = "Plato 2";
incidencia.descripcion = "MUUU MALL";



const mysql = require('mysql2');
const connection = mysql.createConnection(
      {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'Incidencias'
      });

/*si.getConnection().then(conn => {return si.insertarIncidencia(conn, incidencia)})
      .then(data => {incidencia.id = data; incidencia.print();});
console.log("################################################");*/
si.getConnection().then(conn => {return si.borrarIncidencia(conn, 3)})
      .then(data => {console.log("holaaa " +data)});
/*console.log("################################################");
si.getConnection().then(conn => {return si.consultarIncidenciasByPlato(conn)})
      .then(data => {for (var i = 0; i < data.length; i++) {
            data[i].print();
      }});

console.log("################################################");
si.getConnection().then(conn => {return si.consultarIncidenciasByUsuario(conn)})
      .then(data => {for (var i = 0; i < data.length; i++) {
            data[i].print();
      }});

console.log("################################################");
si.getConnection().then(conn => {return si.consultarIncidenciasByRestaurante(conn)})
      .then(data => {for (var i = 0; i < data.length; i++) {
            data[i].print();
      }});

console.log("################################################");
si.getConnection().then(conn => {return si.borrarIncidencia(conn, incidencia.id)}).then(data => {console.log("BORRADO:" + data)});
si.getConnection().then(conn => {return si.consultarAllIncidencias(conn)})
      .then(data => {for (var i = 0; i < data.length; i++) {
            data[i].print();
      }});

console.log("######################## FIN ########################");
incidencia.print();*/





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

