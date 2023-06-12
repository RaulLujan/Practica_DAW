import {Usuario} from "./beans/Usuario.js";

// SERVICIO
class ServicioUsuarios{
    urlbase;
  
    constructor() {
        this.urlbase = 'http://localhost:8081/api/usuarios';
    }
  
    consultarUsuario(id) {
      fetch(this.urlbase + '/' + id, 
            {
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            })
            .then(res => res.json())
            .then(function(res) {
              var usuario = new Usuario();
              usuario.fromJson(res);
              usuario.print();
            })
            .catch(err => console.log('Solicitud fallida', err));
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

  const usuario2 = new Usuario();
  usuario2.fromJson(await response.json());
  usuario2.print();
  return usuario2;
}

// PRUEBAS
servicio = new ServicioUsuarios();
var usuario = require("../beans/Usuario.js");
usuario.nombre = "Prueba";
usuario.apellidos = "Prueba 2";
usuario.email = "Prueba@um.es";
usuario.clave = "123";
usuario.fechaNacimiento = "2012-04-23T18:25:43.511Z";
usuario.idoauth = "Prueba";
usuario.rol = "CLIENTE";
usuario.print();

//servicio.crearUsuario(usuario);

usuario.id = "6480d348e5f4150f8683f5fd";
//servicio.consultarUsuario(usuario.id);

usuario.nombre = "Prueba 2";
//servicio.modificarUsuario(usuario);
//servicio.consultarUsuario(usuario.id);

console.log("################ INI ################");
//usuario2 = new Usuario();
//usuario2 = consultarUsuario2("6480d348e5f4150f8683f5fd");

console.log("################ FIN ################");