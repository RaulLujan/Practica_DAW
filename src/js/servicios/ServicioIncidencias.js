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

async function insertarIncidencia(incidencia) { //TODO: Creo que la incidencia se deberia de crear aqui y no en otro sitio, recibiendo como parametro el idRestaurante, el usuario y el idPlato(nombrePlato o lo que sea)
  const sql = 'INSERT INTO TIncidencias (idUser, idRestaurante, nombrePlato, fecha, descripcion) ' +
  ' VALUES (\'' + incidencia.idUser + '\', \'' + incidencia.idRestaurante + '\', \'' + 
  incidencia.nombrePlato + '\', DATE(NOW()), \'' + incidencia.descripcion +'\');';
  const connection = await getConnection();
  connection.connect(function(err){
    if(err){console.log(err);}
    else{connection.query(sql ,function(err, result){
      if(err){console.log(err);}
      else{return result.insertId;}}); 
    }});
}

async function consultarAllIncidencias() {
  const sql = 'SELECT * FROM TIncidencias ORDER BY FECHA DESC;';
  const connection = await getConnection();
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

async function consultarIncidenciasByPlato(nombrePlato) {
  const sql = 'SELECT * FROM TIncidencias WHERE nombrePlato = \'' + nombrePlato + '\' ORDER BY FECHA DESC;';
  const connection = await getConnection();
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
  

async function consultarIncidenciasByRestaurante(idRestaurante) {
  const sql = 'SELECT * FROM TIncidencias WHERE idRestaurante = \'' + idRestaurante + '\' ORDER BY FECHA DESC;';
  const connection = await getConnection();
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

async function consultarIncidenciasByUsuario(idUser) {
  const sql = 'SELECT * FROM TIncidencias WHERE idUser = \'' + idUser + '\' ORDER BY FECHA DESC;';
  const connection = await getConnection();
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

async function borrarIncidencia(id) {
  const sql = 'DELETE FROM TIncidencias WHERE id = \'' + id + '\' ;';
  const connection = await getConnection();
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

