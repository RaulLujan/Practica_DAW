package repositorio.implementaciones.mongo;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.bson.conversions.Bson;
import org.bson.types.ObjectId;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.InsertOneResult;

import repositorio.EntidadNoEncontrada;
import repositorio.Repositorio;
import repositorio.RepositorioException;
import usuarios.modelo.Usuario;


public class RepositorioUsuariosMongoDb extends RepositorioMongoDb<Usuario>
		implements Repositorio<Usuario, ObjectId> {

	@Override
	public void createCollection() {
		collection = db.getCollection("usuarios", Usuario.class);
	}

	@Override
	public ObjectId add(Usuario entity) throws RepositorioException {
		InsertOneResult result = collection.insertOne(entity);
		return result.getInsertedId().asObjectId().getValue();
	}

	@Override
	public void update(Usuario entity) throws RepositorioException, EntidadNoEncontrada {
		ObjectId idUser = entity.getId();
		if (collection.replaceOne(Filters.eq("_id", idUser), entity) == null)
			throw new EntidadNoEncontrada(" El usuario con id: " + entity.getId() + " no existe");
		
	}

	@Override
	public void delete(Usuario entity) throws RepositorioException, EntidadNoEncontrada {
		ObjectId idUser = entity.getId();
		collection.deleteOne(Filters.eq("_id", idUser));
	}

	@Override
	public Usuario getById(ObjectId id) throws RepositorioException, EntidadNoEncontrada {
		ObjectId idUser = id;
		Bson query = Filters.eq("_id", idUser);
		FindIterable<Usuario> resultados = collection.find(query);
		MongoCursor<Usuario> it = resultados.iterator();
		if (!it.hasNext())
			throw new EntidadNoEncontrada(id + " no existe");
		return it.tryNext();
	}

	@Override
	public List<Usuario> getAll() throws RepositorioException {
		FindIterable<Usuario> resultados = collection.find();
		MongoCursor<Usuario> it = resultados.iterator();
		List<Usuario> Usuarios = new ArrayList<Usuario>();
		while (it.hasNext()) {
			Usuarios.add(it.next());
		}
		return Usuarios;
	}

	@Override
	public List<ObjectId> getIds() throws RepositorioException {
		return getAll().stream().map(us -> us.getId()).collect(Collectors.toList());
	}

	

}
