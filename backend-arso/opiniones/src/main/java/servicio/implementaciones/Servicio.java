package servicio.implementaciones;

import java.io.StringWriter;

import eventos.EventoAddValoracion;
import modelo.Opinion;
import modelo.Valoracion;
import repositorio.EntidadNoEncontrada;

import repositorio.Repositorio;
import repositorio.RepositorioException;
import repositorio.factoria.FactoriaRepositorios;
import servicio.IServicio;
import utils.Constantes;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class Servicio implements IServicio {

	private Repositorio<Opinion, String> repositorio = FactoriaRepositorios.getRepositorio(Opinion.class);

	@Override
	public String create(Opinion Opinion) throws RepositorioException {
		String id = repositorio.add(Opinion);
		return id;
	}

	@Override
	public void update(Opinion Opinion) throws RepositorioException, EntidadNoEncontrada {
		repositorio.update(Opinion);
	}

	@Override
	public Opinion getOpinion(String id) throws RepositorioException, EntidadNoEncontrada {
		return repositorio.getById(id);
	}

	@Override
	public void removeOpinion(String id) throws RepositorioException, EntidadNoEncontrada {
		Opinion Opinion = repositorio.getById(id);
		repositorio.delete(Opinion);
	}

	@Override
	public void addValoracion(String id, Valoracion valoracion) throws RepositorioException, EntidadNoEncontrada {
		Opinion opinion = getOpinion(id);
		opinion.addValoracion(valoracion);
		update(opinion);

		EventoAddValoracion evento = new EventoAddValoracion();
		evento.setIdOpinion(id);
		evento.setNuevaValroacion(valoracion);
		evento.setNumValoracion(opinion.getNumValoraciones());
		evento.setCalificacionMedia(opinion.getCalificaionMedia());
		notificarValoracion(evento);
	}

	protected void notificarValoracion(EventoAddValoracion evento) {

		try {
			ConnectionFactory factory = new ConnectionFactory();

			// TODO uri

			factory.setUri(Constantes.CONNECTION_RABBITMQ_URI);
			factory.setUsername(Constantes.CONNECTION_RABBITMQ_USER);
			factory.setPassword(Constantes.CONNECTION_RABBITMQ_PASS);
			Connection connection = factory.newConnection();

			Channel channel = connection.createChannel();

			/** Declaración del Exchange **/

			// FIXME: la declaración del exchange habría que hacerla una sola vez en el
			// constructor

			final String exchangeName = Constantes.CONNECTION_RABBITMQ_EXCHANGE;

			boolean durable = true;
			channel.exchangeDeclare(exchangeName, "direct", durable);

			/** Envío del mensaje **/

			ObjectMapper mapper = new ObjectMapper(); // Jackson

			StringWriter writer = new StringWriter();
			mapper.writeValue(writer, evento);

			String mensaje = writer.toString();

			String routingKey = Constantes.CONNECTION_RABBITMQ_EXCHANGE;
			channel.basicPublish(exchangeName, routingKey,
					new AMQP.BasicProperties.Builder().contentType("application/json").build(), mensaje.getBytes());

			channel.close();
			connection.close();
		} catch (Exception e) {

			throw new RuntimeException(e);
		}
	}

}
