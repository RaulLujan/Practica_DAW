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
  const response = await fetch('http://localhost:8081/api/usuarios/' + id, 
          {
              method: 'GET',
              headers: {"Content-Type": "application/json"},
          })
          .catch(err => console.log('Solicitud fallida', err));

  const usuario2 = new usu.Usuario();
  usuario2.fromJson(await response.json());
  return await usuario2;
}
const XMLHttpRequest = require('xhr2');

async function consultarUsuario3(url, methodType){
  var promiseObj = new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.open(methodType, url, true);
    xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhr.setRequestHeader('Access-Control-Allow-Headers', 'application/json');
    xhr.setRequestHeader('Content-Type', '*');
    xhr.setRequestHeader('status-code',200);
    xhr.send();
    xhr.onreadystatechange = function(){
      console.log(xhr);
      if (xhr.readyState === 4){
        if (xhr.status === 200){
          var resp = xhr.responseText;
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

exports.ServicioUsuarios = ServicioUsuarios;
exports.consultarUsuario2 = consultarUsuario2;
exports.consultarUsuario3 = consultarUsuario3;

