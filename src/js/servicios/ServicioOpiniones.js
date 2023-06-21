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
            return opinion
          })
          .catch(err => console.log('Solicitud fallida', err));
  return response;
}

async function addValoracion(id, valoracion) {
  var opinon = await consultarOpinion(id);
  var path = '/addvaloracion/';
  if(opinon.containsValoracion(valoracion))
    path = '/updatevaloracion/';

  const response = await fetch(urlbase + path + id,
          {
              method: 'PUT',
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(valoracion)
          })
          .then(res => {return true})
          .catch(err => console.log('Solicitud fallida', err));
  return response;
}

exports.consultarOpinion = consultarOpinion;
exports.addValoracion = addValoracion;