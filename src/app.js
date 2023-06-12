import Usuario from './js/beans/Usuario';

console.log("################ INI ################");
var usuario = new Usuario();
usuario.nombre = "Prueba";
usuario.apellidos = "Prueba 2";
usuario.email = "Prueba@um.es";
usuario.clave = "123";
usuario.fechaNacimiento = "2012-04-23T18:25:43.511Z";
usuario.idoauth = "Prueba";
usuario.rol = "CLIENTE";
usuario.print();

console.log("################ FIN ################");


