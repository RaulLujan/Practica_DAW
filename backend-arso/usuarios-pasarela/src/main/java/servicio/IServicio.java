package servicio;

import java.util.List;

import repositorio.EntidadNoEncontrada;
import repositorio.RepositorioException;
import usuarios.modelo.Usuario;


public interface IServicio {

	/**
	 * Metodo de alta de un Usuario.
	 * 
	 * @param Usuario debe ser valida respecto al modelo de dominio
	 * @return identificador de la Usuario
	 */
	String create(Usuario usuario) throws RepositorioException;

	// TODO: hilar más fino (por ejemplo, no actualizar todo de golpe, sino crear
	// metodos por atributos)
	/**
	 * Actualiza un Usuario.
	 * 
	 * @param Usuario debe ser valida respecto al modelo de dominio
	 */
	void update(Usuario usuario) throws RepositorioException, EntidadNoEncontrada;

	/**
	 * Recupera un Usuario utilizando el identificador.
	 */
	Usuario getUsuario(String id) throws RepositorioException, EntidadNoEncontrada;

	/**
	 * Elimina un Usuario utilizando el identificador.
	 */
	void removeUsuario(String id) throws RepositorioException, EntidadNoEncontrada;
	
	/**
	 * Recupera un Usuario utilizando el email.
	 */
	Usuario findByEmail(String email) throws RepositorioException, EntidadNoEncontrada;
	
	/**
	 * Recupera un Usuario utilizando el identificador OAuht.
	 */
	Usuario findByOAuthId(String idOAuht) throws RepositorioException, EntidadNoEncontrada;
	
	/**
	 * Recupera todos los Usuario .
	 */
	List<Usuario> findAll() throws RepositorioException;


}
