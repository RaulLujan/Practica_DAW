package servicio.factoria;

import java.util.HashMap;
import java.util.Map;

import utils.Constantes;
import utils.PropertiesReader;

/*
 * Factoría que encapsula la implementación de un servicio.
 * 
 * Utiliza un fichero de propiedades para cargar la implementación.
 */

public class FactoriaServicios {

	private static Map<Class<?>, Object> servicios = new HashMap<>();

	@SuppressWarnings("unchecked")
	public static <S> S getServicio(Class<?> entidad) {
		try {
			if (servicios.containsKey(entidad)) {
				return (S) servicios.get(entidad);
			} else {
				PropertiesReader properties = new PropertiesReader(Constantes.PROPERTIES_SERVICIOS);
				String clase = properties.getProperty(entidad.getName());
				S implementacion = (S) Class.forName(clase).getConstructor().newInstance();
				servicios.put(entidad, implementacion);
				return implementacion;
			}
		} catch (Exception e) {
			throw new RuntimeException("No se ha podido obtener el servicio");
		}

	}

}
