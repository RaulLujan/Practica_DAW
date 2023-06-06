package utils.api.geonames;

import java.util.LinkedList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import utils.Constantes;
import utils.PropertiesReader;

public class GeonamesApiConsumer {	

	
	/**
	 * Este método, dada una latitud y longitud, devuelve una lista de URLs de sitios de interés
	 * que tengan una entrada en wikipedia.
	 * @param lat	latitud (coordenada)	
	 * @param lng	longitud (coordenada)	
	 * @return	List<String>
	*/
	public static List<String> getURLsGeonames(double lat, double lng) throws Exception {
		List<String> lista = new LinkedList<String>();
		Document docuemnt = getGeonames(lat, lng);
		NodeList entrys = docuemnt.getElementsByTagName("entry");
		for (int i = 0; i < entrys.getLength(); i++) {
			Element diligencia = (Element) entrys.item(i);
			NodeList url = diligencia.getElementsByTagName("wikipediaUrl");
			lista.add(url.item(0).getTextContent());
		}
		return lista;
	}
	
	/**
	 * Este método, dada una latitud y longitud, devuelve un documento de sitios de interés
	 * que tengan una entrada en wikipedia.
	 * @param lat	latitud (coordenada)	
	 * @param lng	longitud (coordenada)	
	 * @return	List<String>
	*/
	private static Document getGeonames(double lat, double lng) throws Exception {
		PropertiesReader properties = new PropertiesReader(Constantes.PROPERTIES_APIS);			
		
		String lang = properties.getProperty("geonames.lang");
		String username = properties.getProperty("geonames.username");
		String baseUrl = properties.getProperty("geonames.baseurl");
		
		String url = baseUrl + "findNearbyWikipedia?lat=" + lat + "&lng=" + lng + "&lang=" + lang
				+ "&username=" + username;
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		DocumentBuilder builder = factory.newDocumentBuilder();
		return builder.parse(url);
	}	
	
}
