var opi = require('../beans/Opinion');
var va = require('../beans/Valoracion');

class ServicioOpiniones{
    urlbase;
  
    constructor() {
        this.urlbase = 'http://opiniones-rest:5204/api/opiniones';
    }
  
    consultarOpinion(id) {
      fetch(this.urlbase + '/' + id, 
            {
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            })
            .then(res => res.json())
            .then(function(res) {
              var opinion = new opi.Opinion();
              opinion.id = id;
              opinion.fromJson(res);
              opinion.print();
            })
            .catch(err => console.log('Solicitud fallida', err));
    }

    crearOpinion(opinion) {
      fetch(this.urlbase, 
            {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(opinion)
            })
            .then(res => res.json())
            .then(function(res) {
              console.log("Nueva Opinion con id: " + res.id);
            })
            .catch(err => console.log('Solicitud fallida', err));
    }

    modificarOpinion(opinion) {
      fetch(this.urlbase + '/' + opinion.id,  
            {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(opinion)
            })
            .then(res => {console.log("Modificada Opinion con id: " + opinion.id)})
            .catch(err => console.log('Solicitud fallida', err));
    }

    anadirValoracion(id, valoracion) {
      console.log(this.urlbase + '/addvaloracion/' + id);
      fetch(this.urlbase + '/addvaloracion/' + id,  
            {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(valoracion)
            })
            .then(res => {console.log("Valoracion agregada a Opinion con id: " + id)})
            .catch(err => console.log('Solicitud fallida', err));
    }
}

exports.ServicioOpiniones = ServicioOpiniones;