var re = require('../beans/Restaurante');
var st = require('../beans/SitioTuristico');

const urlbase = 'http://restaurantes-rest:8080/api/restaurantes';

async function consultarRestaurante(id, token) {
    const response = await fetch(urlbase + '/' + id, 
        {
            method: 'GET',
            headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
        })
        .then(res => res.json())
        .then(function(res) {
            var restaurante = new re.Restaurante();
            restaurante.fromJson(res);
            return restaurante
        })
        .catch(err => console.log('Solicitud fallida', err));
  return response;
}

async function crearRestaurante(restaurante, token) {
    console.log(JSON.stringify(restaurante));
    const response = await fetch(urlbase, 
        {
            method: 'POST',
            headers: {"Content-Type": "application/json; charset=UTF-8", "Cookie": "jwt=" + token,},
            body: JSON.stringify(restaurante)
        })
        .then(res => res.text())
        .then(function(res) {
            console.log("Nuevo Restaurante con id: " + res);
            return res;
        })
        .catch(err => console.log('Solicitud fallida', err));

    await fetch(urlbase + '/opiniones/alta/' + response,  
        {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
        })
        .then(res => {console.log("Alta en Servicio de Opiniones a Restaurante con id: " + response)})
        .catch(err => console.log('Solicitud fallida', err));
    
    return response;
}

async function modificarRestaurante(restaurante, token) {
    const response = await fetch(urlbase + '/' + restaurante.id, 
        {
            method: 'PUT',
            headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
        })
        .then(function(res) { return true;})
        .catch(err => console.log('Solicitud fallida', err));
    return response;
}

async function borrarRestaurante(id, token) {
    const response = await fetch(urlbase + '/' + id,
        {
            method: 'DELETE',
            headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
        })
        .then(function(res) { return true;})
        .catch(err => console.log('Solicitud fallida', err));
    return response;
}

async function consultarSitiosTuristicosProximos(id, token) {
    const response = await fetch(urlbase + '/sitiosturisticos/proximos/' + id, 
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
            return listSitiosTuristicos;
        })
        .catch(err => console.log('Solicitud fallida', err));
    return response;
}

async function añadirSitiosTuristicosProximos(listSitiosTuristicos, id, token) {
    const response = await fetch(urlbase + '/sitiosturisticos/' + id,
        {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
            body: JSON.stringify(listSitiosTuristicos)
        })
        .then(function(res) { return true;})
        .catch(err => console.log('Solicitud fallida', err));
    return response;
}

async function borrarSitioTuristico(idSitio, id, token) {
    const response = await fetch(urlbase + '/sitiosturisticos/' + id + '/' + idSitio,
        {
            method: 'DELETE',
            headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
        })
        .then(function(res) { return true;})
        .catch(err => console.log('Solicitud fallida', err));
    return response;
}

async function consultarPlato(idPlato, id, token) {
    const restaurante = await consultarRestaurante(id, token)
    if(restaurante !== undefined && restaurante.platos !== undefined){
        for (var i = 0; i < restaurante.platos.length; i++) {
            if(restaurante.platos[i].id === idPlato)
                return restaurante.platos[i]
        }
    }
    return null;
}

async function consultarSitio(idSitio, id, token) {
    const restaurante = await consultarRestaurante(id, token)
    if(restaurante !== undefined && restaurante.sitiosTuristicos !== undefined){
        for (var i = 0; i < restaurante.sitiosTuristicos.length; i++) {
            if(restaurante.sitiosTuristicos[i].id === idSitio)
                return restaurante.sitiosTuristicos[i]
        }
    }
    return null;
}

async function añadirPlato(plato, id, token) {
    const response = await fetch(urlbase + '/plato/' + id,
        {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
            body: JSON.stringify(plato)
        })
        .then(function(res) { return true;})
        .catch(err => console.log('Solicitud fallida', err));
    return response;
}

async function modificarPlato(plato, id, token) {
    const response = await fetch(urlbase + '/plato/' + id,
        {
            method: 'PUT',
            headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
            body: JSON.stringify(plato)
        })
        .then(function(res) { return true;})
        .catch(err => console.log('Solicitud fallida', err));
    return response;
}

async function borrarPlato(idPlato, id, token) {
    const response = await fetch(urlbase + '/plato/' + id + '/' + idPlato,
        {
            method: 'DELETE',
            headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
        })
        .then(function(res) { return true;})
        .catch(err => console.log('Solicitud fallida', err));
    return response;
}

async function consultarAllRestaurantes(token) {
    const response = await fetch(urlbase + '/all', 
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
                listRestaurantes.push(restaurante);
            }
           return listRestaurantes;
        })
        .catch(err => console.log('Solicitud fallida', err));
    return response;
}

async function consultarRestaurantesFiltrado(filtro, token) {
    const response = await fetch(urlbase + '/filtros', 
        {
            method: 'POST',
            headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
            body: JSON.stringify(filtro)
        })
        .then(res => res.json())
        .then(function(res) {
            const listRestaurantes = [];
            for (var i = 0; i < res.length; i++) {
                var restaurante = new re.Restaurante();
                restaurante.fromJson(res[i]);
                listRestaurantes.push(restaurante);
            }
           return listRestaurantes;
        })
        .catch(err => console.log('Solicitud fallida', err));
    return response;
}

exports.consultarRestaurante = consultarRestaurante;
exports.crearRestaurante = crearRestaurante;
exports.modificarRestaurante = modificarRestaurante;
exports.borrarRestaurante = borrarRestaurante;
exports.consultarSitio = consultarSitio;
exports.consultarSitiosTuristicosProximos = consultarSitiosTuristicosProximos;
exports.añadirSitiosTuristicosProximos = añadirSitiosTuristicosProximos;
exports.borrarSitioTuristico = borrarSitioTuristico;
exports.consultarPlato = consultarPlato;
exports.añadirPlato = añadirPlato;
exports.modificarPlato = modificarPlato;
exports.borrarPlato = borrarPlato;
exports.consultarAllRestaurantes = consultarAllRestaurantes;
exports.consultarRestaurantesFiltrado = consultarRestaurantesFiltrado;

