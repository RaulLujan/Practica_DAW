package modelo;

import java.io.Serializable;
import java.util.Date;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;

import org.bson.BsonType;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.codecs.pojo.annotations.BsonRepresentation;

import com.mongodb.client.model.geojson.Point;

import modelo.filtros.Specificable;
import modelo.filtros.Specification;
import utils.Identificable;

public class Restaurante implements Identificable, Serializable, Specificable<Restaurante> {

	private static final long serialVersionUID = 1L;
	private static int CONT_PLATO = 1;
	private static int CONT_ST = 1;

	@BsonId
	@BsonRepresentation(BsonType.OBJECT_ID)
	private String id;
	@BsonProperty
	private String nombre;
	private Point coordenadas;
	private String idGestor;
	private String ciudad;
	private String descripcion;
	private Date fechaAlta;
	private List<SitioTuristico> sitiosTuristicos;
	private List<Plato> platos;
	private String idOpinion;
	private ResumenValoracion resumenValoracion;

	public Restaurante() {
		sitiosTuristicos = new LinkedList<SitioTuristico>();
		platos = new LinkedList<Plato>();
		resumenValoracion = new ResumenValoracion();
	}

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

	public Point getCoordenadas() {
		return coordenadas;
	}

	public void setCoordenadas(Point coordenadas) {
		this.coordenadas = coordenadas;
	}

	public List<SitioTuristico> getSitiosTuristicos() {
		return sitiosTuristicos;
	}

	public void setSitiosTuristicos(List<SitioTuristico> sitiosTuristicos) {
		this.sitiosTuristicos = sitiosTuristicos;
	}

	public void addSitiosTuristicos(List<SitioTuristico> sitiosTuristicos) {
		if (CONT_ST == 1 && this.sitiosTuristicos != null && this.sitiosTuristicos.size() > 0)
			CONT_ST = Integer.parseInt(sitiosTuristicos.get(sitiosTuristicos.size() - 1).getId()) + 1;
		for (SitioTuristico sitioTuristico : sitiosTuristicos) {
			sitioTuristico.setId(CONT_ST + "");
			CONT_ST++;
		}
		this.sitiosTuristicos.addAll(sitiosTuristicos);
	}

	public List<Plato> getPlatos() {
		return platos;
	}

	public void setPlatos(List<Plato> platos) {
		this.platos = platos;
	}

	public String getIdOpinion() {
		return idOpinion;
	}

	public void setIdOpinion(String idOpinion) {
		this.idOpinion = idOpinion;
	}

	public ResumenValoracion getResumenValoracion() {
		return resumenValoracion;
	}

	public void setResumenValoracion(ResumenValoracion resumenValoracion) {
		this.resumenValoracion = resumenValoracion;
	}

	public String getCiudad() {
		return ciudad;
	}

	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}

	public void addPlato(Plato plato) {
		if (this.platos == null)
			this.platos = new LinkedList<Plato>();
		else if (CONT_PLATO == 1 && platos.size() > 0)
			CONT_PLATO = Integer.parseInt(platos.get(platos.size() - 1).getId()) + 1;
		plato.setId(CONT_PLATO + "");
		CONT_PLATO++;
		this.platos.add(plato);
	}

	public boolean updatePlato(Plato plato) {
		if (this.platos == null)
			this.platos = new LinkedList<Plato>();
		ListIterator<Plato> it = platos.listIterator();
		while (it.hasNext()) {
			Plato p = it.next();
			if (p.getId().equals(plato.getId())) {
				p.setNombre(plato.getNombre());
				p.setDescripcion(plato.getDescripcion());
				p.setPrecio(plato.getPrecio());
				return true;
			}
		}
		return false;
	}

	public boolean removePlato(String idplato) {
		if (this.platos == null)
			this.platos = new LinkedList<Plato>();
		Plato plato = findPlato(idplato);
		if (plato != null) {
			this.platos.remove(plato);
			return true;
		}
		return false;
	}

	public boolean removeSitioTuristico(String idST) {
		if (this.sitiosTuristicos == null)
			this.sitiosTuristicos = new LinkedList<SitioTuristico>();
		SitioTuristico sitioTuristico = findSitioTuristico(idST);
		if (sitioTuristico != null) {
			this.sitiosTuristicos.remove(sitioTuristico);
			return true;
		}
		return false;
	}

	protected Plato findPlato(String idPlato) {
		for (Plato plato : platos)
			if (plato.getId().equals(idPlato))
				return plato;
		return null;
	}

	protected SitioTuristico findSitioTuristico(String idST) {
		for (SitioTuristico sitioTuristico : sitiosTuristicos)
			if (sitioTuristico.getId().equals(idST))
				return sitioTuristico;
		return null;
	}

	public String getIdGestor() {
		return idGestor;
	}

	public void setIdGestor(String idGestor) {
		this.idGestor = idGestor;
	}

	public Date getFechaAlta() {
		return fechaAlta;
	}

	public void setFechaAlta(Date fechaAlta) {
		this.fechaAlta = fechaAlta;
	}


	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}



	@Override
	public String toString() {
		return "Restaurante [id=" + id + ", nombre=" + nombre + ", coordenadas=" + coordenadas + ", idGestor="
				+ idGestor + ", ciudad=" + ciudad + ", descripcion=" + descripcion + ", fechaAlta=" + fechaAlta
				+ ", sitiosTuristicos=" + sitiosTuristicos + ", platos=" + platos + ", idOpinion=" + idOpinion
				+ ", resumenValoracion=" + resumenValoracion + "]";
	}

	@Override
	public boolean satisfies(Specification<Restaurante> specification) {
		return specification.isSatisfied(this);
	}

}
