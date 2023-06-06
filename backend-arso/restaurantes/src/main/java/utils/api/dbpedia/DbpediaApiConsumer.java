package utils.api.dbpedia;

import java.io.InputStream;

import java.net.URL;
import java.net.URLDecoder;
import java.util.LinkedList;
import java.util.List;

import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonReader;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbConfig;
import javax.json.bind.config.PropertyNamingStrategy;
import javax.json.bind.config.PropertyOrderStrategy;
import javax.json.bind.spi.JsonbProvider;

import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import dto.SitioTuristicoDTO;
import dto.SitioTuristicoDTO.Item;
import utils.Constantes;
import utils.PropertiesReader;

public class DbpediaApiConsumer {


	/**
	 * Este método, dada la url de un artículo en wikipedia devuelve una lista de
	 * sitios turisticos de acuerdo a la información disponible en es.dbpedia.org.
	 * 
	 * @param wikipediaUrl url del articulo de wikipedia
	 * @return List<SitioTuristicoDTO>
	 */
	public static SitioTuristicoDTO getDBpedia(String wikipediaUrl) throws Exception {
		PropertiesReader properties = new PropertiesReader(Constantes.PROPERTIES_APIS);
		String[] listURL = wikipediaUrl.split("/");
		String pathGeonames = listURL[listURL.length - 1];

		String baseUrl = properties.getProperty("dbpedia.baseurl");
		String stringURL = baseUrl + "data/" + pathGeonames + ".json";

		URL url = new URL(stringURL);
		InputStream stream = url.openStream();

		JsonReader jsonReader = Json.createReader(stream);
		JsonObject obj = jsonReader.readObject();

		pathGeonames = URLDecoder.decode(pathGeonames, "UTF-8");
		JsonObject propiedades = obj.getJsonObject(Constantes.URL_BASE_API_DBPEDIA + pathGeonames);

		JsonbConfig config = new JsonbConfig().withNullValues(true).withFormatting(true)
				.withPropertyNamingStrategy(PropertyNamingStrategy.LOWER_CASE_WITH_UNDERSCORES)
				.withPropertyOrderStrategy(PropertyOrderStrategy.LEXICOGRAPHICAL);

		Jsonb contexto = JsonbProvider.provider().create().withConfig(config).build();

		SitioTuristicoDTO sitio = contexto.fromJson(propiedades.toString(), SitioTuristicoDTO.class);
		sitio.setNombre(pathGeonames);

		return sitio;

	}

//	
//		
//		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
//		DocumentBuilder builder = factory.newDocumentBuilder();
//		Document docuemnt = builder.parse(url);
//		
//		
//		NodeList resource = docuemnt.getElementsByTagName("http://es.dbpedia.org/resource/" + pathGeonames);
//		for (int i = 0; i < resource.getLength(); i++) {
//			SitioTuristicoDTO st = new SitioTuristicoDTO();
//			Element diligencia = (Element) resource.item(i);
//			NodeList resumen = diligencia.getElementsByTagName("http://dbpedia.org/ontology/abstract");
//			NodeList categoria = diligencia.getElementsByTagName("http://www.w3.org/1999/02/22-rdf-syntax-ns#type");
//			NodeList enlacesEx = diligencia.getElementsByTagName("http://dbpedia.org/ontology/wikiPageExternalLink");
//			NodeList imagen = diligencia.getElementsByTagName("http://es.dbpedia.org/property/imagen");
//			st.setNombre(pathGeonames);
//			st.setResumen(getItems(resumen));
//			st.setCategorias(getItems(categoria));
//			st.setEnlacesExternos(getItems(enlacesEx));
//			st.setImagenes(getItems(imagen));
//			lista.add(st);
//		}
//		return lista;
//	}

	/**
	 * Este método, dado un nodo del RDF/JSON correspondiente a un sitio turistico,
	 * devuelve una lista de sus items.
	 * 
	 * @param node nodo de un RDF/JSON
	 * @return List<Item>>
	 */
	private static List<Item> getItems(NodeList node) throws Exception {
		List<Item> lista = new LinkedList<Item>();
		for (int i = 0; i < node.getLength(); i++) {
			Item item = new Item();
			Element dil = (Element) node.item(i);
			NodeList type = dil.getElementsByTagName("type");
			item.setType(type.item(0).getTextContent());
			NodeList value = dil.getElementsByTagName("value");
			item.setValue(value.item(0).getTextContent());
			NodeList lang = dil.getElementsByTagName("lang");
			item.setValue(lang.item(0).getTextContent());
			lista.add(item);
		}
		return lista;
	}

}
