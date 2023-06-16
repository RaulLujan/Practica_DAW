var va = require('./Valoracion');

class Opinion {

  // Propiedades
  id; 
  nombre;  
  valoraciones=[];  


  // Metodos
  fromJson(json){
    this.nombre = json.nombre;
    const valoraciones = json['valoraciones'];
    if (valoraciones !== undefined) {
      for (var i = 0; i < valoraciones.length; i++) {
        var valoracion = new va.Valoracion();
        valoracion.fromJson(valoraciones[i]);
        this.valoraciones.push(valoracion);
      }
    }
  }

  print(){
    console.log("Opinion: { id: " + this.id +", nombre: " + this.nombre + ", ");
    if(this.valoraciones !== undefined){
      this.valoraciones.forEach(function(v){
        v.print()
      });
    }
    console.log(" }");
  }
 
}

exports.Opinion = Opinion;