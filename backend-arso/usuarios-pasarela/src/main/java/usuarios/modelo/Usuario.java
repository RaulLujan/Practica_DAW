package usuarios.modelo;

import java.io.Serializable;
import java.util.Date;

import org.bson.BsonType;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.codecs.pojo.annotations.BsonRepresentation;
import org.bson.types.ObjectId;


public class Usuario implements Serializable {

	private static final long serialVersionUID = 1L;

	@BsonId
	@BsonRepresentation(BsonType.OBJECT_ID)
	private ObjectId _id;
	@BsonProperty
	private String nombre;
	private String apellidos;
	private String email;
	private String clave;
	private Date fechaNacimiento;
	private String idoauth;
	private Rol rol;

	public Usuario() {

	}

	public Usuario(ObjectId id, String nombre, String apellidos, String email, String clave, Date fechaNacimiento,
			String idOAuth, Rol rol) {
		super();
		this._id = id;
		this.nombre = nombre;
		this.apellidos = apellidos;
		this.email = email;
		this.clave = clave;
		this.fechaNacimiento = fechaNacimiento;
		this.idoauth = idOAuth;
		this.rol = rol;
	}

	public Usuario(String nombre, String email, String idOAuth, Rol rol) {
		super();
		this.nombre = nombre;
		this.email = email;
		this.idoauth = idOAuth;
		this.rol = rol;
	}

	public ObjectId getId() {
		return _id;
	}

	public void setId(ObjectId id) {
		this._id = id;
	}

	public String getIdSrt() {
		return _id.toString();
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getClave() {
		return clave;
	}

	public void setClave(String clave) {
		this.clave = clave;
	}

	public Date getFechaNacimiento() {
		return fechaNacimiento;
	}

	public void setFechaNacimiento(Date fechaNacimiento) {
		this.fechaNacimiento = fechaNacimiento;
	}

	public String getIdoauth() {
		return idoauth;
	}

	public void setIdoauth(String idOAuth) {
		this.idoauth = idOAuth;
	}

	public Rol getRol() {
		return rol;
	}

	public void setRol(Rol rol) {
		this.rol = rol;
	}

	@Override
	public String toString() {
		return "Usuario [id=" + _id + ", nombre=" + nombre + ", apellidos=" + apellidos + ", email=" + email + ", clave="
				+ clave + ", fechaNacimiento=" + fechaNacimiento + ", idOAuth=" + idoauth + ", rol=" + rol + "]";
	}

}
