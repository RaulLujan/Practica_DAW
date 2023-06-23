class SitioTuristico {

    // Propiedades
    id;
    nombre;
    descripcion;
    imagenesUrls = [];
    enlacesInformativos = [];
  
    // Metodos
    fromJson(json){
      this.id = json.id;
      this.nombre = json.nombre;
      this.descripcion = json.descripcion;
      this.imagenesUrls = json.imagenesUrls;
      this.enlacesInformativos = json.enlacesInformativos;
    }
  
    print(){
      console.log("SitioTuristico: { id: " + this.id +  ", nombre: " + this.nombre +  ", descripcion: " + this.descripcion + ",");
      console.log(this.enlacesInformativos);
      console.log(this.imagenesUrls);
      console.log("}");
    }
}

exports.SitioTuristico = SitioTuristico;