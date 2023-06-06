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