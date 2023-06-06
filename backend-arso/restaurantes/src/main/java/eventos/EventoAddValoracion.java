package eventos;

import javax.json.bind.annotation.JsonbProperty;

public class EventoAddValoracion {

	@JsonbProperty(value = "idOpinion")
	private String idOpinion;
	@JsonbProperty(value = "numeroValoracion")
	private String numeroValoracion;
	@JsonbProperty(value = "calificacionMedia")
	private String calificacionMedia;
	
	public String getIdOpinion() {
		return idOpinion;
	}
	public void setIdOpinion(String idOpinion) {
		this.idOpinion = idOpinion;
	}
	public String getNumeroValoracion() {
		return numeroValoracion;
	}
	public void setNumeroValoracion(String numeroValoracion) {
		this.numeroValoracion = numeroValoracion;
	}
	public String getCalificacionMedia() {
		return calificacionMedia;
	}
	public void setCalificacionMedia(String calificacionMedia) {
		this.calificacionMedia = calificacionMedia;
	}
	
}
	
