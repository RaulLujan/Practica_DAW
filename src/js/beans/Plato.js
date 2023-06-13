class Plato {

    // Propiedades
    nombre;
    descripcion;
    precio;
  
    // Metodos
    fromJson(json){
      this.nombre = json.nombre;
      this.descripcion = json.descripcion;
      this.precio = json.precio;
    }
  
    print(){
      console.log("Plato: { nombre: " + this.nombre +  ", descripcion: " + this.descripcion + ", precio: " +  this.precio + " }");
    }
}

exports.Plato = Plato;