console.log("######################## INICIO ########################");

class Restaurante {

    // Propiedades
    id;
    nombre;
    coordenadaX;
    coordenadaY;
    idGestor;
    sitiosTuristicos;
    platos;
    idOpinion;
    resumenValoracion;
  
    constructor(nombre, coordenadaX, coordenadaY, idGestor) {
      this.nombre = nombre;  
      this.coordenadaX = coordenadaX;
      this.coordenadaY = coordenadaY;
      this.idGestor = idGestor;
    }
  
    // Metodos
    fromJson(json){
      res = JSON.parse(json);
      this.id = res.id;
      this.nombre = res.nombre;
      this.coordenadaX = res.coordenadaX;
      this.coordenadaY = res.coordenadaY;
      this.idGestor = res.idGestor;
      this.sitiosTuristicos = res.sitiosTuristicos;
      this.platos = res.platos;
      this.idOpinion = res.idOpinion;
      this.resumenValoracion = res.resumenValoracion;
    }
  
    toJson(){
      return JSON.stringify(this)
    }
  }

  class ServicioRestaurantes{
    //const urlbase = 'http://localhost:8080/api/restaurantes';

    realizarPeticion(metodo, body){
        let res = fetch('http://localhost:8080/api/restaurantes', 
        {
            method: metodo,
            headers: {"Content-Type": "text/html",},
            body: body.toJson()
        })
        .then(res => res)
        .then(function(response) {
            console.log(response.body);
            return response;
        });
        return res;
    }

    crearRestaurante(restaurante){
       let id = this.realizarPeticion('POST', restaurante);

       console.log(id);
    }

    consultarRestaurante(id){
        let res =  fetch('http://localhost:8080/api/restaurantes/'+ id, 
        {
            method: 'GET',
            headers: {"Content-Type": "application/json",},
        })
        .then(res => res.json())
        .then(res=> {return res});
        return res;
     }
}

//const Restaurante = require('./beans/Restaurante.js');
//const ServicioRestaurantes = require('./servicios/ServicioRestaurantes.js');

res = new Restaurante("Prueba Web", 4, 5, "1234");
servicio = new ServicioRestaurantes();
resta = servicio.consultarRestaurante('647cdca858fea1331fd9e719');
console.log(resta);
console.log("######################## FINAL ########################");