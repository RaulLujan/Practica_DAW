using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace Opiniones.Modelo
{
    public class Opinion
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId _id { get; set; }
        public string GetId() { return _id.ToString();}
        public void SetId(string id) { _id = ObjectId.Parse(id);}
        public string Nombre { get; set; }
        public List<Valoracion> Valoraciones { get; set; } = new List<Valoracion>();
        public int GetNumValoraciones() { return Valoraciones.Count; }
        public double GetCalificacionMedia() { return  Valoraciones.Sum( e => e.Calificacion)/(double) GetNumValoraciones(); }

        public void AddValoracion(Valoracion valoracion) {
            Valoraciones.Add(valoracion);
        }

        public void UpdateValoracion(Valoracion valoracion) {
            Console.Write(valoracion.Id);
            for (var i = 0; i < Valoraciones.Count; i++) {
                Console.Write(Valoraciones[i].Id);
                if(Valoraciones[i].Id == valoracion.Id){
                    Valoraciones[i] = valoracion;
                    Console.Write(" MODIFICO");
                }
                Console.Write(" MODIFICO " + Valoraciones[i].Comentario);
            }
        }

         public Valoracion constainsValoracion(string IdUser) {
            for (var i = 0; i < Valoraciones.Count; i++) {
                if(Valoraciones[i].IdUser == IdUser){
                    return Valoraciones[i];
                }
            }
            return null;
        }


    }


    public class Valoracion
    {

        public string Id { get; set; }
        public string Correo { get; set; }
        public int Calificacion { get; set; }
        public string Comentario { get; set; }
        public string IdUser { get; set; }
	}

}