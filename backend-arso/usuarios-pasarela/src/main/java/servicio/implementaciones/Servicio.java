package servicio.implementaciones;

import java.util.List;

import org.bson.types.ObjectId;

import repositorio.EntidadNoEncontrada;
import repositorio.Repositorio;
import repositorio.RepositorioException;
import repositorio.factoria.FactoriaRepositorios;
import servicio.IServicio;
import usuarios.modelo.Usuario;

public class Servicio implements IServicio {

	private Repositorio<Usuario, ObjectId> repositorio = FactoriaRepositorios.getRepositorio(Usuario.class);

	@Override
	public String create(Usuario usuario) throws RepositorioException {
		String id = repositorio.add(usuario).toString();
		return id;
	}

	@Override
	public void update(Usuario usuario) throws RepositorioException, EntidadNoEncontrada {
		repositorio.update(usuario);
	}

	@Override
	public Usuario getUsuario(String id) throws RepositorioException, EntidadNoEncontrada {
		return repositorio.getById(new ObjectId(id));
	}

	@Override
	public void removeUsuario(String id) throws RepositorioException, EntidadNoEncontrada {
		Usuario usuario = repositorio.getById(new ObjectId(id));
		repositorio.delete(usuario);
	}

	@Override
	public Usuario findByEmail(String email) throws RepositorioException, EntidadNoEncontrada {
		Usuario resultado = repositorio.getAll().stream().filter(usuario -> usuario.getEmail().equals(email))
				.findFirst().orElseThrow(() -> new EntidadNoEncontrada("No existe usuario con email: " + email));

		return resultado;
	}

	@Override
	public Usuario findByOAuthId(String oauthId) throws RepositorioException, EntidadNoEncontrada {

		Usuario resultado = repositorio.getAll().stream().filter(usuario -> usuario.getIdoauth().equals(oauthId))
				.findFirst().orElseThrow(() -> new EntidadNoEncontrada("No existe usuario con id OAuth: " + oauthId));

		return resultado;
	}

	@Override
	public List<Usuario> findAll() throws RepositorioException {
		return repositorio.getAll();
	}

}
