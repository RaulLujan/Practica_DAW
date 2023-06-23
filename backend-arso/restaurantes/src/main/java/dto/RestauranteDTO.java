package dto;

import java.util.Date;
import java.util.List;

import javax.json.bind.annotation.JsonbProperty;

import com.mongodb.client.model.geojson.Point;
import com.mongodb.client.model.geojson.Position;

import modelo.Plato;
import modelo.Restaurante;
import modelo.SitioTuristico;

public class RestauranteDTO {

	private String id;

	@JsonbProperty("nombre")
	private String nombre;
	@JsonbProperty("ciudad")
	private String ciudad;
	@JsonbProperty("descripcion")
	private String descripcion;
	@JsonbProperty("fechaAlta")
	private Date fechaAlta;
	@JsonbProperty("idGestor")
	private String idGestor;
	@JsonbProperty("coordenadaX")
	private Double coordenadaX;
	@JsonbProperty("coordenadaY")
	private Double coordenadaY;
	@JsonbProperty("platos")
	private List<Plato> platos;
	@JsonbProperty("sitiosTuristicos")
	private List<SitioTuristico> sitiosTuristicos;

	public RestauranteDTO() {
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

	public Double getCoordenadaX() {
		return coordenadaX;
	}

	public void setCoordenadaX(Double coordenadaX) {
		this.coordenadaX = coordenadaX;
	}

	public Double getCoordenadaY() {
		return coordenadaY;
	}

	public void setCoordenadaY(Double coordenadaY) {
		this.coordenadaY = coordenadaY;
	}

	public String getIdGestor() {
		return idGestor;
	}

	public void setIdGestor(String idGestor) {
		this.idGestor = idGestor;
	}

	public List<Plato> getPlatos() {
		return platos;
	}

	public void setPlatos(List<Plato> platos) {
		this.platos = platos;
	}

	public List<SitioTuristico> getSitiosTuristicos() {
		return sitiosTuristicos;
	}

	public void setSitiosTuristicos(List<SitioTuristico> sitiosTuristicos) {
		this.sitiosTuristicos = sitiosTuristicos;
	}

	public String getCiudad() {
		return ciudad;
	}

	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
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

	public Restaurante transformarRestaurante() {
		Restaurante res = new Restaurante();
		res.setId(id);
		res.setNombre(nombre);
		res.setCoordenadas(new Point(new Position(coordenadaX, coordenadaY)));
		res.setSitiosTuristicos(sitiosTuristicos);
		res.setIdGestor(idGestor);
		res.setPlatos(platos);
		res.setCiudad(ciudad);
		res.setDescripcion(descripcion);
		if (fechaAlta == null)
			res.setFechaAlta(new Date());
		else
			res.setFechaAlta(fechaAlta);
		return res;
	}

}
