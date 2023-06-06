package repositorio.implementaciones.mongo;

import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import utils.Constantes;

public abstract class RepositorioMongoDb<T> {

	protected static MongoClient mongoClient;
	protected static MongoDatabase db;
	protected CodecRegistry defaultCodecRegistry;
	protected MongoCollection<T> collection;

	public RepositorioMongoDb() {

		defaultCodecRegistry = CodecRegistries.fromProviders(PojoCodecProvider.builder().automatic(true).build());
		CodecRegistry codecRegistry = CodecRegistries.fromRegistries(MongoClientSettings.getDefaultCodecRegistry(),
				defaultCodecRegistry);

		ConnectionString connectionString = new ConnectionString(System.getenv(Constantes.CONNECTION_MONGO_URI));

		MongoClientSettings settings = MongoClientSettings.builder().applyConnectionString(connectionString)
				.codecRegistry(codecRegistry).build();

		mongoClient = MongoClients.create(settings);

		db = mongoClient.getDatabase(Constantes.NAME_DATABASE);

		createCollection();

	}

	public abstract void createCollection();

}
