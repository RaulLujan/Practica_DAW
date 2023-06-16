const inc = require('../beans/Incidencia');
const mysql = require('mysql2');

async function getConnection() {
  const connection = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  return connection;
}

async function insertarIncidencia(connection, incidencia) {
  const sql = 'INSERT INTO TIncidencias (idUser, idRestaurante, nombrePlato, fecha, descripcion) ' +
  ' VALUES (\'' + incidencia.idUser + '\', \'' + incidencia.idRestaurante + '\', \'' + 
  incidencia.nombrePlato + '\', DATE(NOW()), \'' + incidencia.descripcion +'\');';

  connection.connect(function(err){
    if(err){console.log(err);}
    else{connection.query(sql ,function(err, result){
      if(err){console.log(err);}
      else{return result.insertId;}}); 
    }});
}

async function consultarAllIncidencias(connection) {
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
        }
        console.log(listIncidencias);
        return listIncidencias;}}); 
    }});
}

async function consultarIncidenciasByPlato(connection, nombrePlato) {
  const sql = 'SELECT * FROM TIncidencias WHERE nombrePlato = \'' + nombrePlato + '\' ;';
  
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
        }
        console.log(listIncidencias);
        return listIncidencias;}}); 
    }});
}
  

async function consultarIncidenciasByRestaurante(connection, idRestaurante) {
  const sql = 'SELECT * FROM TIncidencias WHERE idRestaurante = \'' + idRestaurante + '\' ;';
  
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
        }
        console.log(listIncidencias);
        return listIncidencias;}}); 
    }});
}

async function consultarIncidenciasByUsuario(connection, idUser) {
  const sql = 'SELECT * FROM TIncidencias WHERE idUser = \'' + idUser + '\' ;';
  
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
        }
        console.log(listIncidencias);
        return listIncidencias;}}); 
    }});
}

async function borrarIncidencia(connection, id) {
  const sql = 'DELETE FROM TIncidencias WHERE id = \'' + id + '\' ;';
  
  connection.connect(function(err){
    if(err){console.log(err);}
    else{connection.query(sql ,function(err, result){
      if(err){console.log(err);}
      else{return true}}); 
    }});
}

exports.getConnection = getConnection;
exports.insertarIncidencia = insertarIncidencia;
exports.consultarAllIncidencias = consultarAllIncidencias;
exports.consultarIncidenciasByPlato = consultarIncidenciasByPlato;
exports.consultarIncidenciasByUsuario = consultarIncidenciasByUsuario;
exports.consultarIncidenciasByRestaurante = consultarIncidenciasByRestaurante;
exports.borrarIncidencia = borrarIncidencia;

