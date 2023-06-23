package servicio;

import repositorio.EntidadNoEncontrada;
import repositorio.RepositorioException;

import java.util.List;

import dto.FiltrosDTO;
import modelo.Plato;
import modelo.Restaurante;
import modelo.SitioTuristico;

public interface IServicio {

	/**
	 * Metodo de alta de un restaurante.
	 * 
	 * @param restaurante debe ser valida respecto al modelo de dominio
	 * @return identificador de la restaurante
	 */
	String create(Restaurante restaurante) throws RepositorioException;

	// TODO: hilar más fino (por ejemplo, no actualizar todo de golpe, sino crear
	// metodos por atributos)
	/**
	 * Actualiza un restaurante.
	 * 
	 * @param restaurante debe ser valida respecto al modelo de dominio
	 */
	void update(Restaurante restaurante) throws RepositorioException, EntidadNoEncontrada;

	/**
	 * Recupera un restaurante utilizando el identificador.
	 */
	Restaurante getRestaurante(String id) throws RepositorioException, EntidadNoEncontrada;

	/**
	 * Elimina un restaurante utilizando el identificador.
	 */
	void removeRestaurante(String id) throws RepositorioException, EntidadNoEncontrada;

	/**
	 * Obtener sitios turísticos próximos utilizando el identificador.
	 */
	List<SitioTuristico> getSitiosTuristicosProximos(String id) throws Exception;

	/**
	 * Actualiza un restaurante, insertandole Sitios turisticos, utilizando el
	 * identificador y una lista de Sitios Turisticos
	 */
	void setSitiosTuristicosDestacados(String id, List<SitioTuristico> sitiosTuristicos)
			throws RepositorioException, EntidadNoEncontrada;

	/**
	 * Actualiza un restaurante, añadiendole un Plato, utilizando el identificador y
	 * un Plato
	 */
	void addPlato(String id, Plato plato) throws RepositorioException, EntidadNoEncontrada;

	/**
	 * Actualiza un restaurante, actulizando un Plato, utilizando el identificador y
	 * un Plato
	 */
	void updatePlato(String id, Plato plato) throws RepositorioException, EntidadNoEncontrada;

	/**
	 * Actualiza un restaurante, borrandole un Plato, utilizando el identificador y
	 * el nombre del Plato
	 */
	void removePlato(String id, String idPlato) throws RepositorioException, EntidadNoEncontrada;

	/**
	 * Crea un aopinion y se asigna el ID de la Opinion al restauratne para dar de
	 * alta al restaurante en el servicio de Opiniones
	 */
	void altaServicioOpiniones(String id) throws Exception;

	/**
	 * Obtener un Restaurante utilizando el identificador del Gestor.
	 */
	List<Restaurante> getRestauranteByIdGestor(String id) throws RepositorioException, EntidadNoEncontrada;

	/**
	 * Obtener todos los Restaurantes.
	 */
	List<Restaurante> getAll() throws RepositorioException;

	/**
	 * Obtener todos los Restaurantes fintrando por los parametros.
	 */
	List<Restaurante> getAllFiltrado(FiltrosDTO filtros) throws RepositorioException;

	/**
	 * Actualiza un restaurante, borrandole un Plato, utilizando el identificador y
	 * el nombre del Plato
	 */
	void removeSitioTuristico(String id, String idST) throws RepositorioException, EntidadNoEncontrada;
	
	


}
