class Valoracion {

    // Propiedades
    Id;
    Correo;
    Calificacion;
    Comentario;
    IdUser;
  
    // Metodos
    fromJson(json){
      this.Id = json.id;
      this.Correo = json.correo;
      this.Calificacion = json.calificacion;  
      this.Comentario = json.comentario;  
      this.IdUser = json.idUser;  
    }
    
    print(){
      console.log("Valoracion: { Id: " + this.Id +", Correo: " + this.Correo +  ", Calificacion: " 
      + this.Calificacion + ", Comentario: " + this.Comentario + ", IdUser: " + this.IdUser + " }");
    }
  }

exports.Valoracion = Valoracion;