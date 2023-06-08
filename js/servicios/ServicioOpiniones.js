// CLASES
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
        valoracion = new Valoracion();
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

// SERVICIO
class ServicioOpiniones{
    urlbase;
  
    constructor() {
        this.urlbase = 'http://localhost:5204/api/opiniones';
    }
  
    consultarOpinion(id) {
      fetch(this.urlbase + '/' + id, 
            {
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            })
            .then(res => res.json())
            .then(function(res) {
              var opinion = new Opinion();
              opinion.id = id;
              opinion.fromJson(res);
              opinion.print();
            })
            .catch(err => console.log('Solicitud fallida', err));
    }

    crearOpinion(opinion) {
      fetch(this.urlbase, 
            {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(opinion)
            })
            .then(res => res.json())
            .then(function(res) {
              console.log("Nueva Opinion con id: " + res.id);
            })
            .catch(err => console.log('Solicitud fallida', err));
    }

    modificarOpinion(opinion) {
      fetch(this.urlbase + '/' + opinion.id,  
            {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(opinion)
            })
            .then(res => {console.log("Modificada Opinion con id: " + opinion.id)})
            .catch(err => console.log('Solicitud fallida', err));
    }

    anadirValoracion(id, valoracion) {
      console.log(this.urlbase + '/addvaloracion/' + id);
      fetch(this.urlbase + '/addvaloracion/' + id,  
            {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(valoracion)
            })
            .then(res => {console.log("Valoracion agregada a Opinion con id: " + id)})
            .catch(err => console.log('Solicitud fallida', err));
    }
  }

// PRUEBAS
servicio = new ServicioOpiniones();
opinion = new Opinion();
opinion.nombre = "Prueba Web";

//servicio.crearOpinion(opinion);

opinion.id = '6480c02fac49e3cb58503a56';
opinion.nombre = "Prueba Web 2";
//servicio.modificarOpinion(opinion);
//servicio.consultarOpinion(opinion.id);

valoracion = new Valoracion();
valoracion.Id = "1";
valoracion.Correo = "prueba@um.es";
valoracion.Calificacion = 5;
valoracion.Comentario = "BLABLA";
valoracion.IdUser = "123";
//servicio.anadirValoracion(opinion.id, valoracion);
servicio.consultarOpinion(opinion.id);
