class ResumenValoracion {

    // Propiedades
    numValoracion;
    calificacionMedia;
  
    // Metodos
    fromJson(json){
      this.numValoracion = json.numValoracion;
      this.calificacionMedia = json.calificacionMedia;
    }
  
    print(){
      console.log("ResumenValoracion: { numValoracion: " + this.numValoracion +  ", calificacionMedia: " + this.calificacionMedia + " }");
    }
}

exports.ResumenValoracion = ResumenValoracion;