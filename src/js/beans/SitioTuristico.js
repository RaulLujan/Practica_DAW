class SitioTuristico {

    // Propiedades
    nombre;
    descripcion;
    imagenesUrls = [];
    enlacesInformativos = [];
  
    // Metodos
    fromJson(json){
      this.nombre = json.nombre;
      this.descripcion = json.descripcion;
      this.imagenesUrls = json.imagenesUrls;
      this.enlacesInformativos = json.enlacesInformativos;
    }
  
    print(){
      console.log("SitioTuristico: { nombre: " + this.nombre +  ", descripcion: " + this.descripcion + ",");
      console.log(this.enlacesInformativos);
      console.log(this.imagenesUrls);
      console.log("}");
    }
}

exports.SitioTuristico = SitioTuristico;