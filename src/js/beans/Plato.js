class Plato {

    // Propiedades
    id;
    nombre;
    descripcion;
    precio;
    disponible;
  
    // Metodos
    fromJson(json){
      this.id = json.id;
      this.nombre = json.nombre;
      this.descripcion = json.descripcion;
      this.precio = json.precio;
      this.disponible = json.disponible;
    }
  
    print(){
      console.log("Plato: { id: " + this.id +  ", nombre: " + this.nombre +  ", descripcion: " + this.descripcion + ", precio: " +  this.precio + ", disponible: " + this.disponible +" }");
    }
}

exports.Plato = Plato;