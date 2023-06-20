var usu = require('../beans/Usuario');

// SERVICIO
class ServicioUsuarios{
    urlbase;
  
    constructor() {
        this.urlbase = 'http://usuario-rest:8081/api/usuarios';
    }
  
    consultarUsuario(id) {
      return fetch(this.urlbase + '/' + id, 
            {
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            });
    }

    crearUsuario(usuario) {
      fetch(this.urlbase, 
            {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(usuario)
            })
            .then(res => res.text())
            .then(function(res) {
              console.log("Nuevo Usuario con id: " + res);
            })
            .catch(err => console.log('Solicitud fallida', err));
    }

    modificarUsuario(usuario) {
      fetch(this.urlbase + '/' + usuario.id,  
            {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(usuario)
            })
            .then(res => {console.log("Modificado Usuario con id: " + usuario.id)})
            .catch(err => console.log('Solicitud fallida', err));
    }
  }

async function consultarUsuario2(id) {
  const response = await fetch('http://usuarios-rest:8081/api/usuarios/' + id, 
          {
              method: 'GET',
              headers: {"Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*'}
          })
          .then(res => {
            const usuario2 = new usu.Usuario();
            usuario2.fromJson(res.json());
            usuario2.print();
            return res;
          })
          .catch(err => console.log('Solicitud fallida', err));

 
  return await response;
}
const XMLHttpRequest = require('xhr2');

async function consultarUsuario3(url, methodType){
  var promiseObj = new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.open(methodType, url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Access-Control-Allow-Headers', 'application/json');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader('status-code',200);
    xhr.send();
    xhr.onreadystatechange = function(){
      console.log("HOLAAA 1" + xhr);
      if (xhr.readyState === 4){
        if (xhr.status === 0){
          var resp = xhr.responseText;
          console.log("HOLAAA 2" +xhr.upload);
          console.log("HOLAAA 3" +xhr.body);
          var respJSON = JSON.parse(resp);
          resolve(respJSON);
        } else {
          reject(xhr.status);
        }
      }
    }
  });
  return promiseObj;
}

const axios = require('axios');
async function consultarUsuario4(id) {

axios.get('http://usuarios-rest:8081/api/usuarios/' + id, {
  headers: {"Content-Type": "application/json"},
}).then(data => {
            const usuario2 = new usu.Usuario();
            usuario2.fromJson(data.json());
            usuario2.print();
          })
          .catch(err => console.log('Solicitud fallida', err));
}

exports.ServicioUsuarios = ServicioUsuarios;
exports.consultarUsuario2 = consultarUsuario2;
exports.consultarUsuario3 = consultarUsuario3;
exports.consultarUsuario4 = consultarUsuario4;

