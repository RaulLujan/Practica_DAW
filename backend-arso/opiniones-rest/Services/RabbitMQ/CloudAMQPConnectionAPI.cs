using System;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

namespace CloudAMQPConnectionAPI
{
    public class CloudAMQPConnectionSettings
    {
        public string Hostname { get; set; }
        public string Uri { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string VirtualHost { get; set; }
    }

    public class CloudAMQPConnection
    {
        private ConnectionFactory _connectionFactory;
        private IConnection _connection;
        private IModel _channel;

        public CloudAMQPConnection(CloudAMQPConnectionSettings settings)
        {
            _connectionFactory = new ConnectionFactory
            {
                HostName = settings.Hostname,
                UserName = settings.Username,
                Password = settings.Password,
                VirtualHost = settings.VirtualHost,
                Uri = new Uri(settings.Uri)
            };
        }

        public void Connect()
        {
            _connection = _connectionFactory.CreateConnection();
            _channel = _connection.CreateModel();
        }

        public void Disconnect()
        {
            _channel.Close();
            _connection.Close();
        }

        public void PublishMessage(string queueName, string message)
        {
            var body = Encoding.UTF8.GetBytes(message);
            _channel.BasicPublish("", queueName, null, body);
        }

        public void ConsumeMessages(string queueName, Action<string> handleMessage)
        {
            _channel.QueueDeclare(queueName, false, false, false, null);

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (model, ea) =>
            {
                var message = Encoding.UTF8.GetString(ea.Body.ToArray());
                handleMessage(message);
            };

            _channel.BasicConsume(queueName, true, consumer);
        }
    }
}