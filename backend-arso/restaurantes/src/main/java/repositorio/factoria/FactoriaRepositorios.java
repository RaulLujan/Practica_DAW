package repositorio.factoria;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import repositorio.Repositorio;
import utils.Constantes;
import utils.PropertiesReader;

/*
 * Factoría que encapsula la implementación del repositorio.
 * 
 * Utiliza un fichero de propiedades para cargar la implementación.
 */

public class FactoriaRepositorios {
	
	private static Map<Class<?>, Object> repositorios = new HashMap<>();
	
	@SuppressWarnings("unchecked")
	public static <T, K, R extends Repositorio<T, K>> R getRepositorio(Class<?> entidad, String... propertiesFileName) {
				
			try {
				if (repositorios.containsKey(entidad)) {
					return (R) repositorios.get(entidad);
				}
				else {
					String propFileName = Constantes.PROPERTIES_REPOSITORIOS ;
					if(!Arrays.asList(propertiesFileName).isEmpty())
						propFileName = Arrays.asList(propertiesFileName).get(0);
					PropertiesReader properties = new PropertiesReader(propFileName);
					String clase = properties.getProperty(entidad.getName());
					R repositorio = (R) Class.forName(clase).getConstructor().newInstance();
					repositorios.put(entidad, repositorio);
					return repositorio;
				}
			}
			catch (Exception e) {
				
				throw new RuntimeException("No se ha podido obtener el repositorio para la entidad: " + entidad.getName());
			}
			
	}
	
}
