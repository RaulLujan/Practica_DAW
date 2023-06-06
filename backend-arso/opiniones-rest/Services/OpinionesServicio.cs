
using System;
using System.Collections.Generic;
using Opiniones.Modelo;
using Repositorio;
using CloudAMQPConnectionAPI;

namespace Opiniones.Servicio
{

    public interface IServicioOpiniones
    {

        string Create(Opinion Opinion);

        void Update(string id, Opinion Opinion);

        Opinion Get(string id);

        List<Opinion> GetAll();

        void Remove(string id);

        void AddValoracion(string id, Valoracion valoracion);

    }

    public class ServicioOpiniones : IServicioOpiniones
    {

        const String CONNECTION_RABBITMQ_URI = "amqps://glodslds:FePWvb6yiz3DfeJSKvlOAr6h94Iichii@rat.rmq2.cloudamqp.com/glodslds";
        const String CONNECTION_RABBITMQ_USER = "glodslds";
        const String CONNECTION_RABBITMQ_PASS = "FePWvb6yiz3DfeJSKvlOAr6h94Iichii";
        const String CONNECTION_RABBITMQ_EXCHANGE = "nueva-valoracion";


        private Repositorio<Opinion, string> repositorio;
        private CloudAMQPConnection couldConnect;

        public ServicioOpiniones(Repositorio<Opinion, string> repositorio)
        {
            this.repositorio = repositorio;
            CloudAMQPConnectionSettings  connectionSettings = new CloudAMQPConnectionSettings();
            connectionSettings.Uri = CONNECTION_RABBITMQ_URI;
            connectionSettings.Username = CONNECTION_RABBITMQ_USER;
            connectionSettings.Password = CONNECTION_RABBITMQ_PASS;

            couldConnect = new CloudAMQPConnection(connectionSettings);
            couldConnect.Connect();
        }


        public string Create(Opinion Opinion)
        {

            return repositorio.Add(Opinion);

        }

        public void Update(string id, Opinion Opinion)
        {
            Opinion.SetId(id);
            repositorio.Update(Opinion);
        }

        public Opinion Get(string id)
        {

            return repositorio.GetById(id);
        }

        public List<Opinion> GetAll()
        {
            return repositorio.GetAll();
        }

        public void Remove(string id)
        {

            Opinion Opinion = repositorio.GetById(id);

            repositorio.Delete(Opinion);
        }

        public void AddValoracion(string id, Valoracion valoracion)
        {
            Opinion opinion = Get(id);
            opinion.AddValoracion(valoracion);
            Update(id, opinion);
            EnviarNotificacion(opinion);
        }

        public void EnviarNotificacion(Opinion opinion)
        {
            string message = "{\"idOpinion\" : \"" + opinion.GetId() 
            + "\", \"numeroValoracion\" : \"" + opinion.GetNumValoraciones() 
            + "\", \"calificacionMedia\" : \"" + opinion.GetCalificacionMedia().ToString().Replace(',', '.') + "\" }";
            couldConnect.PublishMessage(CONNECTION_RABBITMQ_EXCHANGE, message);
        }

    }

}