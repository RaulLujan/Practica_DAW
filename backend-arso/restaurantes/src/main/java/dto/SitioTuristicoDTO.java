package dto;

import java.util.List;
import java.util.stream.Collectors;

import javax.json.bind.annotation.JsonbProperty;

import modelo.SitioTuristico;

public class SitioTuristicoDTO {
	private String nombre;
	@JsonbProperty(nillable = true, value = "http://dbpedia.org/ontology/abstract")
	private List<Item> resumen;
	@JsonbProperty(nillable = true, value = "http://www.w3.org/1999/02/22-rdf-syntax-ns#type")
	private List<Item> categorias;
	@JsonbProperty(nillable = true, value = "http://dbpedia.org/ontology/wikiPageExternalLink")
	private List<Item> enlacesExternos;
	@JsonbProperty(nillable = true, value = "http://es.dbpedia.org/property/imagen")
	private List<Item> imagenes;

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public List<Item> getResumen() {
		return resumen;
	}

	public void setResumen(List<Item> resumen) {
		this.resumen = resumen;
	}

	public List<Item> getCategorias() {
		return categorias;
	}

	public void setCategorias(List<Item> categorias) {
		this.categorias = categorias;
	}

	public List<Item> getEnlacesExternos() {
		return enlacesExternos;
	}

	public void setEnlacesExternos(List<Item> enlacesExternos) {
		this.enlacesExternos = enlacesExternos;
	}

	public List<Item> getImagenes() {
		return imagenes;
	}

	public void setImagenes(List<Item> imagenes) {
		this.imagenes = imagenes;
	}

	public SitioTuristico fromDtoToModel() {
		SitioTuristico sitioTuristico = new SitioTuristico();
		sitioTuristico.setNombre(nombre);
		sitioTuristico.setDescripcion(resumen != null ? resumen.get(0).getValue() : null);
		sitioTuristico.setImagenesUrls(imagenes != null ? imagenes.stream().map(e -> e.getValue()).collect(Collectors.toList()) : null);
		sitioTuristico
				.setEnlacesInformativos(enlacesExternos != null ? enlacesExternos.stream().map(e -> e.getValue()).collect(Collectors.toList()) : null);

		return sitioTuristico;
	}

	public static class Item {
		@JsonbProperty(nillable = true)
		private String type;
		@JsonbProperty(nillable = true)
		private String value;
		@JsonbProperty(nillable = true)
		private String lang;

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public String getValue() {
			return value;
		}

		public void setValue(String value) {
			this.value = value;
		}

		public String getLang() {
			return lang;
		}

		public void setLang(String lang) {
			this.lang = lang;
		}

	}

}