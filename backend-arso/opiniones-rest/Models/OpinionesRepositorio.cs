
using Repositorio;
using MongoDB.Driver;
using MongoDB.Bson;
using Opiniones.Modelo;

namespace Opiniones.Repositorio
{

    public class RepositorioOpinionesMongoDB : Repositorio<Opinion, string>
    {

        const String CONNECTION_MONGO_URI = "URI_MONGODB";
        const String NAME_DATABASE = "BBDD-DAW-RAUL-VICTOR";

        private readonly IMongoCollection<Opinion> Opiniones;

        public RepositorioOpinionesMongoDB()
        {
            
            string uriMongo = Environment.GetEnvironmentVariable(CONNECTION_MONGO_URI);
            var client = new MongoClient(uriMongo);
            var database = client.GetDatabase(NAME_DATABASE);
            Opiniones = database.GetCollection<Opinion>("Opiniones.net");
        }

        public string Add(Opinion entity)
        {
            Opiniones.InsertOne(entity);

            return entity.GetId();
        }

        public void Update(Opinion entity)
        {
            Opiniones.ReplaceOne(Opinion => Opinion._id == entity._id, entity);
        }

        public void Delete(Opinion entity)
        {
            Opiniones.DeleteOne(Opinion => Opinion._id == entity._id);
        }

        public List<Opinion> GetAll()
        {
            return Opiniones.Find(_ => true).ToList();
        }

        public Opinion GetById(string id)
        {
            return Opiniones
                .Find(Opinion => Opinion._id == ObjectId.Parse(id))
                .FirstOrDefault();
        }

        public List<string> GetIds()
        {
            var todas =  Opiniones.Find(_ => true).ToList();

            return todas.Select(p => p.GetId()).ToList();

        }

    }

}