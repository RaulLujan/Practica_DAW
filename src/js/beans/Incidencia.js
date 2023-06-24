class Incidencia {

  // Propiedades
  id; 
  idUser;
  idRestaurante;
  idPalto; 
  titulo;
  fecha; 
  descripcion;

  // Metodos
  fromJson(json){
    this.id = json.id;
    this.idUser = json.idUser;
    this.idRestaurante = json.idRestaurante;
    this.idPalto = json.idPalto; 
    this.titulo = json.titulo;
    this.fecha = json.fecha;
    this.descripcion = json.descripcion;
  }
  
  print(){
    console.log("Incidencia: { id: " + this.id + ", idUser: " + this.idUser + ", idRestaurante: " + this.idRestaurante +
    ", idPalto: " + this.idPalto + ", titulo: " + this.titulo + ", fecha: " + this.fecha + ", nombdescripcionre: " + this.descripcion +" }");
  }
   
}
  
exports.Incidencia = Incidencia;