package servicio;

import repositorio.EntidadNoEncontrada;
import repositorio.RepositorioException;

import modelo.Opinion;
import modelo.Valoracion;

public interface IServicio {

	/**
	 * Metodo de alta de un Opinion.
	 * 
	 * @param Opinion debe ser valida respecto al modelo de dominio
	 * @return identificador de la Opinion
	 */
	String create(Opinion Opinion) throws RepositorioException;

	// TODO: hilar más fino (por ejemplo, no actualizar todo de golpe, sino crear
	// metodos por atributos)
	/**
	 * Actualiza un Opinion.
	 * 
	 * @param Opinion debe ser valida respecto al modelo de dominio
	 */
	void update(Opinion Opinion) throws RepositorioException, EntidadNoEncontrada;

	/**
	 * Recupera un Opinion utilizando el identificador.
	 */
	Opinion getOpinion(String id) throws RepositorioException, EntidadNoEncontrada;

	/**
	 * Elimina un Opinion utilizando el identificador.
	 */
	void removeOpinion(String id) throws RepositorioException, EntidadNoEncontrada;

	/**
	 * Actualiza un Opinion, añadiendole un Valoracion, utilizando el
	 * identificador y un Valoracion
	 */
	void addValoracion(String id, Valoracion valoracion) throws RepositorioException, EntidadNoEncontrada;
	
	
}
