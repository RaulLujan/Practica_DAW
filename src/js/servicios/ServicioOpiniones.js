var opi = require('../beans/Opinion');
var va = require('../beans/Valoracion');

const urlbase = 'http://opiniones-rest:5204/api/opiniones';

async function consultarOpinion(id) {
  const response = await fetch(urlbase + '/' + id, 
          {
              method: 'GET',
              headers: {"Content-Type": "application/json"}
          })
          .then(res => res.json())
          .then(function(res) {
            var opinion = new opi.Opinion()
            opinion.id = id
            opinion.fromJson(res)
            console.log("XXXXXXXXXXXXXXXXX - 1")
            console.log(opinion);
            return opinion
          })
          .catch(err => console.log('Solicitud fallida', err));
  return response;
}

async function consultarValoracion(id, idUser) {
  const response = await fetch(urlbase + '/valoracion/' + id + '/' + idUser, 
          {
              method: 'GET',
              headers: {"Content-Type": "application/json"}
          })
          .then(res => res.json())
          .then(function(res) {
            var valoracion = new va.Valoracion()
            valoracion.fromJson(res)
            return valoracion
          })
          .catch(err => console.log('Solicitud fallida', err));
  return response;
}

async function addValoracion(id, valoracion) {
  var valo = await consultarValoracion(id, valoracion.IdUser);
  var path = '/addvaloracion/';
  if(valo.Id !== undefined)
    path = '/updatevaloracion/';
  else{
    const opinion = await consultarOpinion(restaurante.idOpinion);
    if(opinion.valoraciones === undefined) valoracion.Id = 1;
    else valoracion.Id = opinion.valoraciones[opinion.valoraciones.length -1] + 1;
  }

  console.log(urlbase + path + id);
  console.log(JSON.stringify(valoracion))
  const response = await fetch(urlbase + path + id,
          {
              method: 'PUT',
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(valoracion)
          })
          .then(res => {console.log(res);return true})
          .catch(err => console.log('Solicitud fallida', err));
  return response;
}

exports.consultarOpinion = consultarOpinion;
exports.consultarValoracion = consultarValoracion;
exports.addValoracion = addValoracion;