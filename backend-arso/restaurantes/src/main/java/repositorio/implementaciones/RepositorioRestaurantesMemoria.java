package repositorio.implementaciones;

import java.util.List;

import modelo.Restaurante;
import repositorio.EntidadNoEncontrada;
import repositorio.RepositorioException;
import repositorio.implementaciones.memoria.RepositorioMemoria;

public class RepositorioRestaurantesMemoria extends RepositorioMemoria<Restaurante> implements RepositorioRestaurantes {

	@Override
	public Restaurante getByIdOpinion(String id) throws RepositorioException, EntidadNoEncontrada {
		return getAll().stream().filter(r -> r.getIdOpinion().equals(id)).findFirst().orElse(null);
	}

	@Override
	public List<Restaurante> getByIdGestor(String id) throws RepositorioException, EntidadNoEncontrada {
		return getAll();
	}
	
}
