var st = require('./SitioTuristico');
var pl = require('./Plato');
var rv = require('./ResumenValoracion');

class Restaurante {

  // Propiedades
  id;
  nombre;
  coordenadaX;
  coordenadaY;
  ciudad;
  idGestor;
  sitiosTuristicos = [];
  platos = [];
  idOpinion;
  resumenValoracion;

  constructor(nombre, coordenadaX, coordenadaY, idGestor, ciudad) {
    this.nombre = nombre;  
    this.coordenadaX = coordenadaX;
    this.coordenadaY = coordenadaY;
    this.idGestor = idGestor;
    this.ciudad = ciudad;
  }

  // Metodos
  fromJson(json){
    this.id = json.id;
    this.nombre = json.nombre;

    const coordenadas = json['coordenadas'];
    if (coordenadas !== undefined) {
      const values = json['coordenadas']['coordinates']['values'];
      this.coordenadaX = values[0];
      this.coordenadaY = values[1];
    }
   
    this.idGestor = json.idGestor;
    this.ciudad = json.ciudad;

    const sitiosTuristicos = json['sitiosTuristicos'];
    if (sitiosTuristicos !== undefined) {
      for (var i = 0; i < sitiosTuristicos.length; i++) {
          var sitioTuristico = new st.SitioTuristico();
          sitioTuristico.fromJson(sitiosTuristicos[i]);
          this.sitiosTuristicos.push(sitioTuristico);
      }
    }

    const platos = json['platos'];
    if (platos !== undefined) {
      for (var i = 0; i < platos.length; i++) {
          var plato = new pl.Plato();
          plato.fromJson(platos[i]);
          this.platos.push(plato);
      }
   }

    this.idOpinion = json.idOpinion;

    const resumenValoracion = json['resumenValoracion'];
    if (resumenValoracion !== undefined) {
      this.resumenValoracion = new rv.ResumenValoracion();
      this.resumenValoracion.fromJson(resumenValoracion);
    }
  }

  print(){
      console.log("Restauratne: { id: " + this.id + ", nombre: " + this.nombre + ", " + ", coordenadaX: " + this.coordenadaX + ", " + 
      ", coordenadaY: " + this.coordenadaY + ", "  + ", idGestor: " + this.idGestor + ", ciudad: " + this.ciudad + ", ");
      if(this.sitiosTuristicos !== undefined){
        this.sitiosTuristicos.forEach(function(v){
          v.print()
        });
      }
      console.log(",");
      if(this.platos !== undefined){
          this.platos.forEach(function(v){
            v.print()
          });
      }
      console.log(",");
      this.resumenValoracion.print();
      console.log(" }");
  }
}

exports.Restaurante = Restaurante;