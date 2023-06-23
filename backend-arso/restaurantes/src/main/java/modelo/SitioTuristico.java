package modelo;

import java.util.List;

public class SitioTuristico {

	private String id;
	private String nombre;
	private String descripcion;
	private List<String> imagenesUrls;
	private List<String> enlacesInformativos;

	
	
	
	
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

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}


	public List<String> getImagenesUrls() {
		return imagenesUrls;
	}

	public void setImagenesUrls(List<String> imagenesUrls) {
		this.imagenesUrls = imagenesUrls;
	}

	public List<String> getEnlacesInformativos() {
		return enlacesInformativos;
	}

	public void setEnlacesInformativos(List<String> enlacesInformativos) {
		this.enlacesInformativos = enlacesInformativos;
	}

	@Override
	public String toString() {
		return "SitioTuristico [id=" + id + ", nombre=" + nombre + ", descripcion=" + descripcion + ", imagenesUrls="
				+ imagenesUrls + ", enlacesInformativos=" + enlacesInformativos + "]";
	}


	

}
