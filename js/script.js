
//import Opinion from "./beans/Opinion";
//import ServicioOpiniones from "./servicios/ServicioOpiniones";

class Opinion {

  // Propiedades
  id; 
  nombre;  
  valoraciones;  
  numValroaciones;  
  calificacionMedia;  

  // Contructor
  constructor(nombre) {
    this.nombre = nombre;  
  }

  /*constructor(id, nombre, valoraciones, numValroaciones, calificacionMedia) {
    this.id = id; 
    this.nombre = nombre;  
    this.valoraciones = valoraciones;  
    this.numValroaciones = numValroaciones;  
    this.calificacionMedia = calificacionMedia;  
  }*/


  // Metodos
  fromJson(json){
    res = JSON.parse(json);
    this.id = res.id;
    this.nombre = res.nombre;
  }

  toJson(){
    return JSON.stringify(this)
  }
}

class ServicioOpiniones{
  urlbase;

  constructor() {
      this.urlbase = 'http://localhost:5204/api/opiniones';;
  }

  consultarOpinon(id) {
      return fetch(this.urlbase + '/' + id, 
          {
              method: 'GET',
              headers: {"Content-Type": "text/html",}
          })
          .then(res => res.json())
          .then(res=> {return res});
  }
  
}


console.log("######################## INICIO ########################");

opi = new Opinion("Prueba Web");
servicio = new ServicioOpiniones();
async function prueba(){
  const id = await servicio.consultarOpinon('647f69a30903c2b2ee5bffb3');
  console.log(id);
}
prueba();

console.log("######################## FINAL ########################");
