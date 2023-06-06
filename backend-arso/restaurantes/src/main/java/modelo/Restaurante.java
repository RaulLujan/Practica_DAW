package modelo;

import java.io.Serializable;
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

	@BsonId
	@BsonRepresentation(BsonType.OBJECT_ID)
	private String id;
	@BsonProperty
	private String nombre;
	private Point coordenadas;
	private String idGestor;
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

	public void addPlato(Plato plato) {
		if (this.platos == null)
			this.platos = new LinkedList<Plato>();
		this.platos.add(plato);
	}

	public boolean updatePlato(Plato plato) {
		if (this.platos == null)
			this.platos = new LinkedList<Plato>();
		ListIterator<Plato> it = platos.listIterator();
		while (it.hasNext()) {
			Plato p = it.next();
			if (p.getNombre().equals(plato.getNombre())) {
				p.setDescripcion(plato.getDescripcion());
				p.setPrecio(plato.getPrecio());
				return true;
			}
		}
		return false;
	}

	public boolean removePlato(String nombre) {
		if (this.platos == null)
			this.platos = new LinkedList<Plato>();
		Plato plato = findPlato(nombre);
		if (plato != null) {
			this.platos.remove(plato);
			return true;
		}
		return false;
	}

	protected Plato findPlato(String nombre) {
		for (Plato plato : platos)
			if (plato.getNombre().equals(nombre))
				return plato;
		return null;
	}

	public String getIdGestor() {
		return idGestor;
	}

	public void setIdGestor(String idGestor) {
		this.idGestor = idGestor;
	}

	@Override
	public String toString() {
		return "Restaurante [id=" + id + ", nombre=" + nombre + ", coordenadas=" + coordenadas + ", idGestor="
				+ idGestor + ", sitiosTuristicos=" + sitiosTuristicos + ", platos=" + platos + ", idOpinion="
				+ idOpinion + ", resumenValoracion=" + resumenValoracion + "]";
	}

	@Override
	public boolean satisfies(Specification<Restaurante> specification) {
		return specification.isSatisfied(this);
	}

}
