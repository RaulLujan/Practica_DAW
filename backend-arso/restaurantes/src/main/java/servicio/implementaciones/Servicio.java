package servicio.implementaciones;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DefaultConsumer;
import com.rabbitmq.client.Envelope;

import dto.FiltrosDTO;
import dto.SitioTuristicoDTO;
import eventos.EventoAddValoracion;
import modelo.Plato;
import modelo.Restaurante;
import modelo.SitioTuristico;
import modelo.filtros.Specification;
import modelo.filtros.TrueSpecification;
import modelo.filtros.implementaciones.FiltroCoordenadasRestaurantes;
import modelo.filtros.implementaciones.FiltroNombreParcialRestaurantes;
import modelo.filtros.implementaciones.FiltroRangoValoracionRestaurantes;
import repositorio.EntidadNoEncontrada;
import repositorio.RepositorioException;
import repositorio.factoria.FactoriaRepositorios;
import repositorio.implementaciones.RepositorioRestaurantes;
import servicio.IServicio;
import utils.Constantes;
import utils.Utils;
import utils.api.dbpedia.DbpediaApiConsumer;
import utils.api.geonames.GeonamesApiConsumer;


public class Servicio implements IServicio {

	private RepositorioRestaurantes repositorio = FactoriaRepositorios.getRepositorio(Restaurante.class);

	public Servicio() {
		try {
			ConnectionFactory factory = new ConnectionFactory();

			factory.setUri(Constantes.CONNECTION_RABBITMQ_URI);
			factory.setUsername(Constantes.CONNECTION_RABBITMQ_USER);
			factory.setPassword(Constantes.CONNECTION_RABBITMQ_PASS);

			Connection connection = factory.newConnection();

			Channel channel = connection.createChannel();

			/** Declaración de la cola y enlace con el exchange **/

			final String exchangeName = Constantes.CONNECTION_RABBITMQ_EXCHANGE;
			final String queueName = Constantes.CONNECTION_RABBITMQ_EXCHANGE;
			final String bindingKey = Constantes.CONNECTION_RABBITMQ_BINDKEY;

			boolean durable = true;
			boolean exclusive = false;
			boolean autodelete = false;
			Map<String, Object> properties = null; // sin propiedades
			channel.queueDeclare(queueName, durable, exclusive, autodelete, properties);

			channel.queueBind(queueName, exchangeName, bindingKey);

			/** Configuración del consumidor **/

			boolean autoAck = false;

			String etiquetaConsumidor = Constantes.CONNECTION_RABBITMQ_EXCHANGE;

			// Consumidor push

			channel.basicConsume(queueName, autoAck, etiquetaConsumidor,

					new DefaultConsumer(channel) {
						@Override
						public void handleDelivery(String consumerTag, Envelope envelope,
								AMQP.BasicProperties properties, byte[] body) throws IOException {

							long deliveryTag = envelope.getDeliveryTag();

							String contenido = new String(body);
							ObjectMapper mapper = new ObjectMapper(); // Jackson
							EventoAddValoracion evento = mapper.readValue(contenido, EventoAddValoracion.class);

							try {
								// Identificar el Restaurnte
								Restaurante resturante = repositorio.getByIdOpinion(evento.getIdOpinion());
								if (resturante != null) {
									resturante.getResumenValoracion()
											.setCalificacionMedia(Double.parseDouble(evento.getCalificacionMedia()));
									resturante.getResumenValoracion()
											.setNumValoracion(Integer.parseInt(evento.getNumeroValoracion()));
									repositorio.update(resturante);
								}

							} catch (Exception e) {
								throw new RuntimeException(e);
							} finally {
								// Confirma el procesamiento
								channel.basicAck(deliveryTag, false);
							}
						}
					});
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public String create(Restaurante restaurante) throws RepositorioException {
		String id = repositorio.add(restaurante);
		return id;
	}

	@Override
	public void update(Restaurante restaurante) throws RepositorioException, EntidadNoEncontrada {
		repositorio.update(restaurante);
	}

	@Override
	public Restaurante getRestaurante(String id) throws RepositorioException, EntidadNoEncontrada {
		return repositorio.getById(id);
	}

	@Override
	public void removeRestaurante(String id) throws RepositorioException, EntidadNoEncontrada {
		Restaurante restaurante = repositorio.getById(id);
		repositorio.delete(restaurante);
	}

	@Override
	public List<SitioTuristico> getSitiosTuristicosProximos(String id) throws Exception {
		List<SitioTuristicoDTO> lista = new LinkedList<SitioTuristicoDTO>();
		Restaurante restaurante = repositorio.getById(id);
		double lat = restaurante.getCoordenadas().getPosition().getValues().get(0);
		double lng = restaurante.getCoordenadas().getPosition().getValues().get(1);
		List<String> listaURLsGeonames = GeonamesApiConsumer.getURLsGeonames(lat, lng);
		for (String url : listaURLsGeonames)
			lista.add(DbpediaApiConsumer.getDBpedia(url));
		return lista.stream().map(e -> e.fromDtoToModel()).collect(Collectors.toList());
	}

	@Override
	public void setSitiosTuristicosDestacados(String id, List<SitioTuristico> sitiosTuristicos)
			throws RepositorioException, EntidadNoEncontrada {
		Restaurante restaurante = getRestaurante(id);
		restaurante.addSitiosTuristicos(sitiosTuristicos);
		update(restaurante);
	}

	@Override
	public void addPlato(String id, Plato plato) throws RepositorioException, EntidadNoEncontrada {
		Restaurante restaurante = getRestaurante(id);
		restaurante.addPlato(plato);
		update(restaurante);
	}

	@Override
	public void updatePlato(String id, Plato plato) throws RepositorioException, EntidadNoEncontrada {
		Restaurante restaurante = getRestaurante(id);
		restaurante.updatePlato(plato);
		update(restaurante);
	}

	@Override
	public void removePlato(String id, String nombre) throws RepositorioException, EntidadNoEncontrada {
		Restaurante restaurante = getRestaurante(id);
		restaurante.removePlato(nombre);
		update(restaurante);
	}

	@Override
	public void altaServicioOpiniones(String id) throws Exception {
		Restaurante restaurante = getRestaurante(id);
		if (restaurante.getIdOpinion() != null)
			throw new RuntimeException("El restaurante ya esta dado de Alta, en el servicio de Opiniones");

		String nombre = "Opinion_" + restaurante.getNombre();
		String idOpinion = Utils.retrofitOpinionesClient(Constantes.URL_BASE_API_OPINION, nombre);
	    JsonParser jsonParser = new JsonParser();
	    JsonObject myJson = (JsonObject) jsonParser.parse(idOpinion);
	    idOpinion = myJson.get("id").getAsString();
		restaurante.setIdOpinion(idOpinion);
		update(restaurante);
	}

	@Override
	public Restaurante getRestauranteByIdGestor(String id) throws RepositorioException, EntidadNoEncontrada {
		return repositorio.getByIdGestor(id);
	}

	@Override
	public List<Restaurante> getAll() throws RepositorioException {
		return repositorio.getAll();
	}

	@Override
	public List<Restaurante> getAllFiltrado(FiltrosDTO filtros) throws RepositorioException {
		List<Specification<Restaurante>> listaSpecifications = new LinkedList<Specification<Restaurante>>();
		Specification<Restaurante> specification = new TrueSpecification<Restaurante>();

		// Construccion de Filtros
		if (filtros.getNombre() != null) 
			listaSpecifications.add(new FiltroNombreParcialRestaurantes(filtros.getNombre()));
		

		if (filtros.getCoorX() != null && filtros.getCoorY() != null && filtros.getDistancia() != null)
			listaSpecifications.add(new FiltroCoordenadasRestaurantes(filtros.getCoorX(), filtros.getCoorY(),
				filtros.getDistancia()));

		if (filtros.getValoracionMin() != null && filtros.getValoracionMax() != null) 
			listaSpecifications.add(new FiltroRangoValoracionRestaurantes((double) filtros.getValoracionMin(),
				(double) filtros.getValoracionMax()));

		
		Specification<Restaurante> specifications = specification.and(listaSpecifications);

		List<Restaurante> restaurantes = repositorio.getAll();
		List<Restaurante> resultado = new LinkedList<Restaurante>();

		for (Restaurante restaurante : restaurantes)
			if (restaurante.satisfies(specifications))
				resultado.add(restaurante);

		return resultado;
	}

}
