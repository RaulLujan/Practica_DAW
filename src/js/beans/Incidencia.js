class Incidencia {

  // Propiedades
  id; 
  idUser;
  idRestaurante;
  nombrePlato; 
  fecha; 
  descripcion;

  // Metodos
  fromJson(json){
    this.id = json.id;
    this.idUser = json.idUser;
    this.idRestaurante = json.idRestaurante;
    this.nombrePlato = json.nombrePlato; 
    this.fecha = json.fecha;
    this.descripcion = json.descripcion;
  }
  
  print(){
    console.log("Incidencia: { id: " + this.id + ", idUser: " + this.idUser + ", idRestaurante: " + this.idRestaurante +
    ", nombrePlato: " + this.nombrePlato + ", fecha: " + this.fecha + ", nombdescripcionre: " + this.descripcion +" }");
  }
   
}
  
exports.Incidencia = Incidencia;