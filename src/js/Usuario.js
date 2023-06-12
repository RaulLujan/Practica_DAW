export class Usuario {

    // Propiedades
    id;
    nombre;
    apellidos;
    email;
    clave;
    fechaNacimiento;
    idoauth;
    rol;
  
    // Metodos
    fromJson(json){
      this.id = json.idSrt;
      this.nombre = json.nombre;
      this.apellidos = json.apellidos;
      this.email = json.email;
      this.clave = json.clave;
      this.fechaNacimiento = json.fechaNacimiento;
      this.idoauth = json.idoauth;
      this.rol = json.rol;
    }
  
    print(){
      console.log("Usuario: { id: " + this.id +", nombre: " + this.nombre +  ", apellidos: " + this.apellidos + ", email: " +  this.email + 
      ",\n clave: " + this.clave + ", fechaNacimiento: " + this.fechaNacimiento + ", idoauth: " + this.idoauth + ", rol: " + this.rol + " }");
    }
  }