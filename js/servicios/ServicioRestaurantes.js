class Restaurante {

    // Propiedades
    id;
    nombre;
    coordenadaX;
    coordenadaY;
    idGestor;
    sitiosTuristicos = [];
    platos = [];
    idOpinion;
    resumenValoracion;
  
    constructor(nombre, coordenadaX, coordenadaY, idGestor) {
      this.nombre = nombre;  
      this.coordenadaX = coordenadaX;
      this.coordenadaY = coordenadaY;
      this.idGestor = idGestor;
    }
  
    // Metodos
    fromJson(json){
      this.id = json.id;
      this.nombre = json.nombre;

      const coordenadas = json['coordenadas'];
      if (coordenadas !== undefined) {
        const values = json['coordenadas']['coordinates']['values'];
        this.coordenadaX = values[0];
        this.coordenadaY = values[1];
      }
     
      this.idGestor = json.idGestor;

      const sitiosTuristicos = json['sitiosTuristicos'];
      if (sitiosTuristicos !== undefined) {
        for (var i = 0; i < sitiosTuristicos.length; i++) {
            var sitioTuristico = new SitioTuristico();
            sitioTuristico.fromJson(sitiosTuristicos[i]);
            this.sitiosTuristicos.push(sitioTuristico);
        }
      }

      const platos = json['platos'];
      if (platos !== undefined) {
        for (var i = 0; i < platos.length; i++) {
            var plato = new Plato();
            plato.fromJson(platos[i]);
            this.platos.push(plato);
        }
     }

      this.idOpinion = json.idOpinion;

      const resumenValoracion = json['resumenValoracion'];
      if (resumenValoracion !== undefined) {
        this.resumenValoracion = new ResumenValoracion();
        this.resumenValoracion.fromJson(resumenValoracion);
      }
    }

    print(){
        console.log("Restauratne: { id: " + this.id + ", nombre: " + this.nombre + ", " + ", coordenadaX: " + this.coordenadaX + ", " + 
        ", coordenadaY: " + this.coordenadaY + ", "  + ", idGestor: " + this.idGestor + ", ");
        if(this.sitiosTuristicos !== undefined){
          this.sitiosTuristicos.forEach(function(v){
            v.print()
          });
        }
        console.log(",");
        if(this.platos !== undefined){
            this.platos.forEach(function(v){
              v.print()
            });
        }
        console.log(",");
        this.resumenValoracion.print();
        console.log(" }");
    }
  }

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



class ServicioRestaurantes{
    urlbase = 'http://localhost:8090/restaurantes';

    consultarRestaurante(id, token) {
        fetch(this.urlbase + '/' + id, 
              {
                  method: 'GET',
                  headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
              })
              .then(res => res.json())
              .then(function(res) {
                var restaurante = new Restaurante();
                restaurante.fromJson(res);
                restaurante.print();
              })
              .catch(err => console.log('Solicitud fallida', err));
    }
}


// PRUEBAS
servicio = new ServicioRestaurantes();
restaurante = new Restaurante();
restaurante.id = '648225188d53b91c1caf3586';
let token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4NWNiZWY0Zi01NTMyLTRiNjctYWEzMS05YmY3NTBhMTM1MTYiLCJpc3MiOiJQYXNhcmVsYSBadXVsIiwiZXhwIjoxNjg2MzM2ODQ2LCJzdWIiOiJSYXVsTHVqYW4iLCJ1c3VhcmlvIjoiUmF1bEx1amFuQHVtLmVzIiwicm9sIjoiQURNSU4ifQ.wxNf2U8kETd10EzaccOkv3ilqJwsFI6s9tY4pBK3hHk';
servicio.consultarRestaurante(restaurante.id, token);