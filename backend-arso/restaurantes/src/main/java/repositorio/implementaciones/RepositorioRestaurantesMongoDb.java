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


import modelo.Restaurante;
import repositorio.EntidadNoEncontrada;
import repositorio.RepositorioException;

public class RepositorioRestaurantesMongoDb extends RepositorioMongoDb<Restaurante>
		implements RepositorioRestaurantes {

	@Override
	public void createCollection() {
		collection = db.getCollection("restaurantes", Restaurante.class);
	}

	@Override
	public String add(Restaurante entity) throws RepositorioException {
		InsertOneResult result = collection.insertOne(entity);
		return result.getInsertedId().asObjectId().getValue().toString();
	}

	@Override
	public void update(Restaurante entity) throws RepositorioException, EntidadNoEncontrada {
		ObjectId idRes = new ObjectId(entity.getId());
		if (collection.replaceOne(Filters.eq("_id", idRes), entity) == null)
			throw new EntidadNoEncontrada(" El resturante con id: " + entity.getId() + " no existe");

	}

	@Override
	public void delete(Restaurante entity) throws RepositorioException, EntidadNoEncontrada {
		ObjectId idRes = new ObjectId(entity.getId());
		collection.deleteOne(Filters.eq("_id", idRes));
	}

	@Override
	public Restaurante getById(String id) throws RepositorioException, EntidadNoEncontrada {
		ObjectId idRes = new ObjectId(id);
		Bson query = Filters.eq("_id", idRes);
		FindIterable<Restaurante> resultados = collection.find(query);
		MongoCursor<Restaurante> it = resultados.iterator();
		if (!it.hasNext())
			throw new EntidadNoEncontrada(id + " no existe");
		return it.tryNext();
	}

	@Override
	public List<Restaurante> getAll() throws RepositorioException {
		FindIterable<Restaurante> resultados = collection.find();
		MongoCursor<Restaurante> it = resultados.iterator();
		List<Restaurante> restaurantes = new ArrayList<Restaurante>();
		while (it.hasNext()) {
			restaurantes.add(it.next());
		}
		return restaurantes;
	}

	@Override
	public List<String> getIds() throws RepositorioException {
		return getAll().stream().map(res -> res.getId()).collect(Collectors.toList());
	}
	
	@Override
	public Restaurante getByIdOpinion(String id) throws RepositorioException, EntidadNoEncontrada {
		Bson query = Filters.eq("idOpinion", id);
		FindIterable<Restaurante> resultados = collection.find(query);
		MongoCursor<Restaurante> it = resultados.iterator();
		if (!it.hasNext())
			throw new EntidadNoEncontrada(id + " no existe");
		return it.tryNext();
	}

	@Override
	public List<Restaurante> getByIdGestor(String id) throws RepositorioException, EntidadNoEncontrada {
		Bson query = Filters.eq("idGestor", id);
		FindIterable<Restaurante> resultados = collection.find(query);
		MongoCursor<Restaurante> it = resultados.iterator();
		List<Restaurante> restaurantes = new ArrayList<Restaurante>();
		while (it.hasNext()) {
			restaurantes.add(it.next());
		}
		return restaurantes;
	}
	
}
