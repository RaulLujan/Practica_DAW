class Plato {

    // Propiedades
    nombre;
    descripcion;
    precio;
    disponibilidad;
  
    // Metodos
    fromJson(json){
      this.nombre = json.nombre;
      this.descripcion = json.descripcion;
      this.precio = json.precio;
      this.disponibilidad = json.disponibilidad;
    }
  
    print(){
      console.log("Plato: { nombre: " + this.nombre +  ", descripcion: " + this.descripcion + ", precio: " +  this.precio + ", " + this.disponibilidad +" }");
    }
}

exports.Plato = Plato;