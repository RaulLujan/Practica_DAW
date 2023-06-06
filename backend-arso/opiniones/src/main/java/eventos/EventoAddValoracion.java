package eventos;


import modelo.Valoracion;

public class EventoAddValoracion {

	private String idOpinion;
	private Valoracion nuevaValroacion;
	private int numValoracion;
	private double calificacionMedia;
	
	public String getIdOpinion() {
		return idOpinion;
	}
	public void setIdOpinion(String idOpinion) {
		this.idOpinion = idOpinion;
	}
	public Valoracion getNuevaValroacion() {
		return nuevaValroacion;
	}
	public void setNuevaValroacion(Valoracion nuevaValroacion) {
		this.nuevaValroacion = nuevaValroacion;
	}
	public int getNumValoracion() {
		return numValoracion;
	}
	public void setNumValoracion(int numValoracion) {
		this.numValoracion = numValoracion;
	}
	public double getCalificacionMedia() {
		return calificacionMedia;
	}
	public void setCalificacionMedia(double calificacionMedia) {
		this.calificacionMedia = calificacionMedia;
	}

	

}
	
