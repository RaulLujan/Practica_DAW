package repositorio.implementaciones;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.bson.conversions.Bson;
import org.bson.types.ObjectId;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Filters;
import com.mongodb.client.result.InsertOneResult;

import modelo.Opinion;
import repositorio.EntidadNoEncontrada;
import repositorio.Repositorio;
import repositorio.RepositorioException;

public class RepositorioOpinionesMongoDb extends RepositorioMongoDb<Opinion> implements Repositorio<Opinion, String> {

	@Override
	public String add(Opinion entity) throws RepositorioException {
		InsertOneResult result = collection.insertOne(entity);
		return result.getInsertedId().toString();
	}

	@Override
	public void update(Opinion entity) throws RepositorioException, EntidadNoEncontrada {
		ObjectId idOpi = new ObjectId(entity.getId());
		if (collection.replaceOne(Filters.eq("_id", idOpi), entity) == null)
			throw new EntidadNoEncontrada(" La opinion con id: " + entity.getId() + " no existe");
	}

	@Override
	public void delete(Opinion entity) throws RepositorioException, EntidadNoEncontrada {
		ObjectId idOpi = new ObjectId(entity.getId());
		collection.deleteOne(Filters.eq("_id", idOpi));
	}

	@Override
	public Opinion getById(String id) throws RepositorioException, EntidadNoEncontrada {
		ObjectId idOpi = new ObjectId(id);
		Bson query = Filters.eq("_id", idOpi);
		FindIterable<Opinion> resultados = collection.find(query);
		MongoCursor<Opinion> it = resultados.iterator();
		if (!it.hasNext())
			throw new EntidadNoEncontrada(id + " no existe");
		return it.tryNext();
	}

	@Override
	public List<Opinion> getAll() throws RepositorioException {
		FindIterable<Opinion> resultados = collection.find();
		MongoCursor<Opinion> it = resultados.iterator();
		List<Opinion> opiniones = new ArrayList<Opinion>();
		while (it.hasNext()) {
			opiniones.add(it.next());
		}
		return opiniones;
	}

	@Override
	public List<String> getIds() throws RepositorioException {
		return getAll().stream().map(opi -> opi.getId()).collect(Collectors.toList());
	}

	@Override
	public void createCollection() {
		collection = db.getCollection("opiniones", Opinion.class);
	}

}
