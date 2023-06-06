package modelo;

import java.io.Serializable;
import java.util.List;

import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.codecs.pojo.annotations.BsonRepresentation;

import utils.Identificable;

import org.bson.BsonType;

public class Opinion implements Identificable, Serializable {

	private static final long serialVersionUID = 1L;

	@BsonId
	@BsonRepresentation(BsonType.OBJECT_ID)
	private String id;
	@BsonProperty
	private String nombre;
	private List<Valoracion> valoraciones;
	private int numValoraciones;
	private double calificaionMedia;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public List<Valoracion> getValoraciones() {
		return valoraciones;
	}

	public void setValoraciones(List<Valoracion> valoraciones) {
		this.valoraciones = valoraciones;
	}

	public int getNumValoraciones() {
		return numValoraciones;
	}

	public void setNumValoraciones(int numValoraciones) {
		this.numValoraciones = numValoraciones;
	}

	public double getCalificaionMedia() {
		return calificaionMedia;
	}

	public void setCalificaionMedia(double calificaionMedia) {
		this.calificaionMedia = calificaionMedia;
	}

	public void addValoracion(Valoracion valoracion) {
		this.valoraciones.add(valoracion);
	}

	@Override
	public String toString() {
		return "Opinion [id=" + id + ", nombre=" + nombre + ", valoraciones=" + valoraciones + ", numValoraciones="
				+ numValoraciones + ", calificaionMedia=" + calificaionMedia + "]";
	}



}
