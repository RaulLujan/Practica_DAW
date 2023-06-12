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