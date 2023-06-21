var usu = require('../beans/Usuario');

const urlbase = 'http://usuario-rest:8080/api/usuarios';


async function consultarUsuario(oauth) {
  const response = await fetch(urlbase + '/oauth/' + oauth, 
          {
              method: 'GET',
              headers: {"Content-Type": "application/json"}
          })
          .then(res => res.json())
          .then(json => {
            const usuario2 = new usu.Usuario();
            usuario2.fromJson(json);
            usuario2.print();
            return usuario2;
          })
          .catch(err => console.log('Solicitud fallida', err));
  return response;
}

async function crearUsuario(usuario) {
  const response = await fetch(urlbase, 
          {
              method: 'POST',
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(usuario)
          })
          .then(res => res.text())
          .then(id => {
            usuario.id = id
            return usuario;
          })
          .catch(err => console.log('Solicitud fallida', err));
  return response;
}

async function modificarUsuario(usuario) {
  const response = await fetch(urlbase + '/' + usuario.id,
          {
              method: 'PUT',
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(usuario)
          })
          .then(res => { return true })
          .catch(err => console.log('Solicitud fallida', err));
  return response;
}

exports.consultarUsuario = consultarUsuario;
exports.crearUsuario = crearUsuario;
exports.modificarUsuario = modificarUsuario;

