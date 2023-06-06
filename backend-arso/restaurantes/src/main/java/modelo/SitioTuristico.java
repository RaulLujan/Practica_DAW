package modelo;

import java.util.List;

public class SitioTuristico {

	private String nombre;
	private String descripcion;
	private Double distancia; // TODO: distancia Double, int...??
	private List<String> imagenesUrls;
	private List<String> enlacesInformativos;

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

	public Double getDistancia() {
		return distancia;
	}

	public void setDistancia(Double distancia) {
		this.distancia = distancia;
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
		return "SitioTuristico [nombre=" + nombre + ", descripcion=" + descripcion + ", distancia=" + distancia
				+ ", imagenesUrls=" + imagenesUrls + ", enlacesInformativos=" + enlacesInformativos + "]";
	}

}
