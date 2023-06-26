const inc = require('../beans/Incidencia');
const mysql = require('mysql2');

async function getConnection() {
  const connection = await mysql.createConnection(
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  return connection;
}

async function consultaGenerica(sql) { 
  const connection = await getConnection();
  const response = connection.connect(function(err){
    if(err){console.log(err);}
    else{connection.query(sql ,function(err, result){
      if(err){console.log(err);}
      else{return result;}}); 
    }});
    return response;
}


async function crearTablaIncidencias() { 
  const sql =  'CREATE TABLE TIncidencias (' +
  'id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,' +
  'idUser VARCHAR(256),' +
  'idRestaurante VARCHAR(256),' +
  'idPalto VARCHAR(256),' +
  'titulo VARCHAR(256),' +
  'fecha DATE,' +
  'descripcion VARCHAR(256)' +
  ');';
  const connection = await getConnection();
  const response = connection.connect(function(err){
    if(err){console.log(err);}
    else{connection.query(sql ,function(err, result){
      if(err){console.log(err);}
      else{return result;}}); 
    }});
    return response;
}


async function insertarIncidencia(incidencia) { 
  const sql = 'INSERT INTO TIncidencias (idUser, idRestaurante, idPalto, titulo, fecha, descripcion) ' +
  ' VALUES (\'' + incidencia.idUser + '\', \'' + incidencia.idRestaurante + '\', \'' + 
  incidencia.idPalto +  '\', \'' +  incidencia.titulo + '\', DATE(NOW()), \'' + incidencia.descripcion +'\');';
  const connection = await getConnection();
  const response = connection.connect(function(err){
    if(err){console.log(err);}
    else{connection.query(sql ,function(err, result){
      if(err){console.log(err);}
      else{return result.insertId;}}); 
    }});
    return response;
}

async function consultarAllIncidencias() {
  const sql = 'SELECT * FROM TIncidencias ORDER BY FECHA DESC;';
  const connection = await getConnection();
  const response = connection.connect(function(err){
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
        return listIncidencias;}}); 
    }});
    return response;
}

async function consultarIncidenciasByPlato(idPalto) {
  const sql = 'SELECT * FROM TIncidencias WHERE nombrePlato = \'' + idPalto + '\' ORDER BY FECHA DESC;';
  const connection = await getConnection();
  const response = connection.connect(function(err){
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
        return listIncidencias;}}); 
    }});
    return response;
}

async function consultarIncidenciasByRestaurante(idRestaurante) {
    const sql = 'SELECT * FROM TIncidencias WHERE idRestaurante = \'' + idRestaurante + '\' ORDER BY FECHA DESC;';
    const connection = await getConnection();

const response = await connection.promise().query(sql)
                const listIncidencias = [];
                for (var i = 0; i < response[0].length; i++) {
                  var incidencia = new inc.Incidencia();
                  incidencia.fromJson(response[0][i]);
                  listIncidencias.push(incidencia);
                }
                return Promise.resolve(listIncidencias);
}

async function consultarIncidenciasByUsuario(idUser) {
  const sql = 'SELECT * FROM TIncidencias WHERE idUser = \'' + idUser + '\' ORDER BY FECHA DESC;';
  const connection = await getConnection();
  const response = connection.connect(function(err){
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
        return listIncidencias;}}); 
    }});
    return response;
}

async function borrarIncidencia(id) {
  const sql = 'DELETE FROM TIncidencias WHERE id = \'' + id + '\' ;';
  const connection = await getConnection();
  const response = connection.connect(function(err){
    if(err){console.log(err);}
    else{connection.query(sql ,function(err, result){
      if(err){console.log(err);}
      else{return true}}); 
    }});
    return response;
}

exports.getConnection = getConnection;
exports.consultaGenerica = consultaGenerica;
exports.crearTablaIncidencias = crearTablaIncidencias;
exports.insertarIncidencia = insertarIncidencia;
exports.consultarAllIncidencias = consultarAllIncidencias;
exports.consultarIncidenciasByPlato = consultarIncidenciasByPlato;
exports.consultarIncidenciasByUsuario = consultarIncidenciasByUsuario;
exports.consultarIncidenciasByRestaurante = consultarIncidenciasByRestaurante;
exports.borrarIncidencia = borrarIncidencia;

