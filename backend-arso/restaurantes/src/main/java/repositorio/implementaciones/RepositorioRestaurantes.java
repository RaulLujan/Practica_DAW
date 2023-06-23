package repositorio.implementaciones;

import java.util.List;

import modelo.Restaurante;
import repositorio.EntidadNoEncontrada;
import repositorio.Repositorio;
import repositorio.RepositorioException;


public interface RepositorioRestaurantes extends Repositorio<Restaurante, String>{
	
	Restaurante getByIdOpinion(String id) throws RepositorioException, EntidadNoEncontrada;
	
	List<Restaurante> getByIdGestor(String id) throws RepositorioException, EntidadNoEncontrada;

}
