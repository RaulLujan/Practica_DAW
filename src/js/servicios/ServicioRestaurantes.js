var re = require('../beans/Restaurante');
var st = require('../beans/SitioTuristico');
var pl = require('../beans/Plato');
var rv = require('../beans/ResumenValoracion');
var fi = require('../beans/Filtro');

class ServicioRestaurantes{
    urlbase = 'http://pasarela:8090/restaurantes';


    consultarRestaurante(id, token) {
        fetch(this.urlbase + '/' + id, 
              {
                  method: 'GET',
                  headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
              })
              .then(res => res.json())
              .then(function(res) {
                var restaurante = new re.Restaurante();
                restaurante.fromJson(res);
                restaurante.print();
              })
              .catch(err => console.log('Solicitud fallida', err));
    }

    crearRestaurante(restaurante, token) {
        fetch(this.urlbase, 
              {
                  method: 'POST',
                  headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
                  body: JSON.stringify(restaurante)
              })
            .then(function(res) {
              console.log("Nuevo Restaurante con id: " + res);
            })
            .catch(err => console.log('Solicitud fallida', err));
    }

    modificarOpinion(restaurante, token) {
        fetch(this.urlbase + '/' + restaurante.id,  
              {
                  method: 'PUT',
                  headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
                  body: JSON.stringify(restaurante)
              })
              .then(res => {console.log("Modificado Restaurante con id: " + restaurante.id)})
              .catch(err => console.log('Solicitud fallida', err));
    }

      borrarRestaurante(id, token) {
        fetch(this.urlbase + '/' + id,  
              {
                  method: 'DELETE',
                  headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
              })
              .then(res => {console.log("Restaurante borrado con id: " + id)})
              .catch(err => console.log('Solicitud fallida', err));
    }

    consultarSitiosTuristicosProximos(id, token) {
        fetch(this.urlbase + '/sitiosturisticos/proximos/' + id,  
              {
                  method: 'GET',
                  headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
              })
              .then(res => res.json())
              .then(function(res) {
                const listSitiosTuristicos = [];
                for (var i = 0; i < res.length; i++) {
                    var sitioTuristico = new st.SitioTuristico();
                    sitioTuristico.fromJson(res[i]);
                    listSitiosTuristicos.push(sitioTuristico);
                }
                console.log(listSitiosTuristicos);
              })
              .catch(err => console.log('Solicitud fallida', err));
    }

    añadirSitiosTuristicosProximos(listSitiosTuristicos, id, token) {
        fetch(this.urlbase + '/sitiosturisticos/' + id,  
              {
                  method: 'POST',
                  headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
                  body: JSON.stringify(listSitiosTuristicos)
              })
              .then(res => {console.log("Sitios Turisticos añadidos a Restaurante con id: " + id)})
              .catch(err => console.log('Solicitud fallida', err));
    }

    añadirPlato(plato, id, token) {
        fetch(this.urlbase + '/plato/' + id,  
              {
                  method: 'POST',
                  headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
                  body: JSON.stringify(plato)
              })
              .then(res => {console.log("Plato añadido a Restaurante con id: " + id)})
              .catch(err => console.log('Solicitud fallida', err));
    }

    modificarPlato(plato, id, token) {
        fetch(this.urlbase + '/plato/' + id,  
              {
                  method: 'PUT',
                  headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
                  body: JSON.stringify(plato)
              })
              .then(res => {console.log("Plato modificado del Restaurante con id: " + id)})
              .catch(err => console.log('Solicitud fallida', err));
    }

    borrarPlato(plato, id, token) {
        fetch(this.urlbase + '/plato/' + id + '/' + plato.nombre,  
              {
                  method: 'DELETE',
                  headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
              })
              .then(res => {console.log("Plato borrado del Restaurante con id: " + id)})
              .catch(err => console.log('Solicitud fallida', err));
    }

    altaServicioOpiniones(id, token) {
        fetch(this.urlbase + '/opiniones/alta/' + id,  
              {
                  method: 'POST',
                  headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
              })
              .then(res => {console.log("Alta en Servicio de Opiniones a Restaurante con id: " + id)})
              .catch(err => console.log('Solicitud fallida', err));
    }

    consultarRestaurantebyIdGestor(id, token) {
        fetch(this.urlbase + '/gestor/' + id, 
              {
                  method: 'GET',
                  headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
              })
              .then(res => res.json())
              .then(function(res) {
                var restaurante = new re.Restaurante();
                restaurante.fromJson(res);
                restaurante.print();
              })
              .catch(err => console.log('Solicitud fallida', err));
    }

    consultarAllRestaurantes(token) {
        fetch(this.urlbase + '/all', 
              {
                  method: 'GET',
                  headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
              })
              .then(res => res.json())
              .then(function(res) {
                const listRestaurantes = [];
                for (var i = 0; i < res.length; i++) {
                    var restaurante = new re.Restaurante();
                    restaurante.fromJson(res[i]);
                    listRestaurantes.push(sitioTuristico);
                }
                console.log(listRestaurantes);
              })
              .catch(err => console.log('Solicitud fallida', err));
    }

    consultarRestaurantesFiltrado(filtro, token) {
        fetch(this.urlbase + '/filtros', 
              {
                  method: 'GET',
                  headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
                  body: JSON.stringify(filtro)
              })
              .then(res => res.json())
              .then(function(res) {
                const listRestaurantes = [];
                for (var i = 0; i < res.length; i++) {
                    var restaurante = new re.Restaurante();
                    restaurante.fromJson(res[i]);
                    listRestaurantes.push(sitioTuristico);
                }
                console.log(listRestaurantes);
              })
              .catch(err => console.log('Solicitud fallida', err));
    }


}


// PRUEBAS
servicio = new ServicioRestaurantes();
restaurante = new Restaurante();
restaurante.id = '648225188d53b91c1caf3586';
let token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI3MzhjYTQyNi0yMjE1LTQ3NWEtYmIzYy02ODUwNzVhOTZmMjIiLCJpc3MiOiJQYXNhcmVsYSBadXVsIiwiZXhwIjoxNjg3MDMxMTY5LCJzdWIiOiJSYXVsTHVqYW4iLCJ1c3VhcmlvIjoiUmF1bEx1amFuQHVtLmVzIiwicm9sIjoiQURNSU4ifQ.AsIjAbJXaOWvB2sM6kkHhVtEXrV-1zUxkc2HMeL7Pq0';
servicio.consultarRestaurante(restaurante.id, token);