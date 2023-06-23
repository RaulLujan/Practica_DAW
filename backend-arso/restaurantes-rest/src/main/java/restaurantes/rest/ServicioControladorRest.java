package restaurantes.rest;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import dto.FiltrosDTO;
import dto.RestauranteDTO;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import modelo.Plato;
import modelo.Restaurante;
import modelo.SitioTuristico;
import restaurantes.rest.seguridad.AvailableRoles;
import restaurantes.rest.seguridad.Secured;
import servicio.IServicio;
import servicio.factoria.FactoriaServicios;

@Api
@Path("restaurantes")
public class ServicioControladorRest {

	private IServicio servicio = FactoriaServicios.getServicio(IServicio.class);

	@Context
	private UriInfo uriInfo;

	// Consulta un restaurante a aprtir del parametro ID
	// curl -i -X GET -H "Content-type: application/xml"
	// http://localhost:8080/api/restaurantes/{id}
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Consulta un restaurante", notes = "Retorna un restaurante utilizando su id", response = Restaurante.class)
	@ApiResponses(value = { @ApiResponse(code = HttpServletResponse.SC_OK, message = ""),
			@ApiResponse(code = HttpServletResponse.SC_NOT_FOUND, message = "Restaurante no encontrado") })
	@Secured({ AvailableRoles.ADMIN, AvailableRoles.GESTOR, AvailableRoles.CLIENTE })
	public Response getRestaurante(@ApiParam(value = "id del restaurante", required = true) @PathParam("id") String id)
			throws Exception {

		return Response.status(Response.Status.OK).entity(servicio.getRestaurante(id)).build();
	}

	// Crea un restaurante a paritr de la informacion del body/fichero introducido
	// curl -i -X POST -H "Content-type: application/xml" -d @test-files/1.xml
	// http://localhost:8080/api/restaurantes
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Secured({ AvailableRoles.ADMIN, AvailableRoles.GESTOR })
	public Response create(RestauranteDTO restauranteDTO) throws Exception {
		Restaurante restaurante = restauranteDTO.transformarRestaurante();
		String id = servicio.create(restaurante);
		return Response.ok(id).build();
	}

	// Actualiza el restaurante correspondiente al ID introdicido por parametro
	// a paritr de la informacion del body/fichero introducido
	// curl -i -X PUT -H "Content-type: application/xml" -d @test-files/1.xml
	// http://localhost:8080/api/restaurantes/{id}
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@ApiResponses(value = { @ApiResponse(code = HttpServletResponse.SC_OK, message = ""),
			@ApiResponse(code = HttpServletResponse.SC_NOT_FOUND, message = "Restaurante no encontrado") })
	@Secured({ AvailableRoles.ADMIN, AvailableRoles.GESTOR })
	public Response update(@ApiParam(value = "id del restaurante", required = true) @PathParam("id") String id,
			RestauranteDTO restauranteDTO) throws Exception {
		Restaurante restaurante = restauranteDTO.transformarRestaurante();
		Restaurante restauranteID = servicio.getRestaurante(id);
		if (!restauranteID.getId().equals(restaurante.getId()))
			throw new IllegalArgumentException("El identificador no coincide: " + id);

		servicio.update(restaurante);

		return Response.status(Response.Status.NO_CONTENT).build();

	}

	// Borra un restaurante a paritr del ID introducido por parametro
	// curl -i -X DELETE http://localhost:8080/api/restaurantea/1
	@DELETE
	@Path("/{id}")
	@ApiResponses(value = { @ApiResponse(code = HttpServletResponse.SC_OK, message = ""),
			@ApiResponse(code = HttpServletResponse.SC_NOT_FOUND, message = "Restaurante no encontrado") })
	@Secured({ AvailableRoles.ADMIN, AvailableRoles.GESTOR })
	public Response removeRestaurante(
			@ApiParam(value = "id del restaurante", required = true) @PathParam("id") String id) throws Exception {
		servicio.removeRestaurante(id);
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	// Consulta los Sitios Turisticos Proximos, a partir del parametro ID del
	// restaurante
	// curl -i -X GET -H "Content-type: application/xml"
	// http://localhost:8080/api/restaurantes/sitiosturisticos/proximos/{id}
	@GET
	@Path("/sitiosturisticos/proximos/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Consulta los Sitios Turisticos proximos a un restaurante", notes = "Retorna una lista de sitios turisticos el id del restaurante", response = SitioTuristico.class)
	@ApiResponses(value = { @ApiResponse(code = HttpServletResponse.SC_OK, message = ""),
			@ApiResponse(code = HttpServletResponse.SC_NOT_FOUND, message = "Restaurante no encontrado") })
	@Secured({ AvailableRoles.ADMIN, AvailableRoles.GESTOR, AvailableRoles.CLIENTE })
	public Response getSitiosTuristicosProximos(
			@ApiParam(value = "id del restaurante", required = true) @PathParam("id") String id) throws Exception {
		return Response.status(Response.Status.OK).entity(servicio.getSitiosTuristicosProximos(id)).build();
	}

	// Añade una lista de sitios turisticos al restaurante, que contiene el ID
	// introducido por
	// parametro
	// curl -i -X POST -H "Content-type: application/xml"
	// http://localhost:8080/api/restaurantes/sitiosturisticos/{id}
	@POST
	@Path("/sitiosturisticos/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@ApiResponses(value = { @ApiResponse(code = HttpServletResponse.SC_OK, message = ""),
			@ApiResponse(code = HttpServletResponse.SC_NOT_FOUND, message = "Restaurante no encontrado") })
	@Secured({ AvailableRoles.ADMIN, AvailableRoles.GESTOR })
	public Response setSitiosTuristicosDestacados(
			@ApiParam(value = "id del restaurante", required = true) @PathParam("id") String id,
			List<SitioTuristico> sitiosTuristicos) throws Exception {
		servicio.setSitiosTuristicosDestacados(id, sitiosTuristicos);
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	// Borra un sitio al restaurante, que contiene el ID introducido por
	// parametro
	// curl -i -X DELETE -H "Content-type: application/xml"
	// http://localhost:8080/api/restaurantes/sitiosturisticos/{id}/{nombre}
	@DELETE
	@Path("/sitiosturisticos/{id}/{idst}")
	@Consumes(MediaType.APPLICATION_JSON)
	@ApiResponses(value = { @ApiResponse(code = HttpServletResponse.SC_OK, message = ""),
			@ApiResponse(code = HttpServletResponse.SC_NOT_FOUND, message = "Restaurante no encontrado") })
	@Secured({ AvailableRoles.ADMIN, AvailableRoles.GESTOR })
	public Response removeSitioturistico(
			@ApiParam(value = "id del restaurante", required = true) @PathParam("id") String id,
			@ApiParam(value = "nombre del Sitioturistico", required = true) @PathParam("idst") String idst)
			throws Exception {
		servicio.removeSitioTuristico(id, idst);
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	// Añade un plato al restaurante, que contiene el ID introducido por
	// parametro
	// curl -i -X POST -H "Content-type: application/xml"
	// http://localhost:8080/api/restaurantes/plato/{id}
	@POST
	@Path("/plato/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@ApiResponses(value = { @ApiResponse(code = HttpServletResponse.SC_OK, message = ""),
			@ApiResponse(code = HttpServletResponse.SC_NOT_FOUND, message = "Restaurante no encontrado") })
	@Secured({ AvailableRoles.ADMIN, AvailableRoles.GESTOR })
	public Response addPlato(@ApiParam(value = "id del restaurante", required = true) @PathParam("id") String id,
			Plato plato) throws Exception {
		servicio.addPlato(id, plato);
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	// Actualiza un plato al restaurante, que contiene el ID introducido por
	// parametro
	// curl -i -X PUT -H "Content-type: application/xml"
	// http://localhost:8080/api/restaurantes/plato/{id}
	@PUT
	@Path("/plato/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@ApiResponses(value = { @ApiResponse(code = HttpServletResponse.SC_OK, message = ""),
			@ApiResponse(code = HttpServletResponse.SC_NOT_FOUND, message = "Restaurante no encontrado") })
	@Secured({ AvailableRoles.ADMIN, AvailableRoles.GESTOR })
	public Response updatePlato(@ApiParam(value = "id del restaurante", required = true) @PathParam("id") String id,
			Plato plato) throws Exception {
		servicio.updatePlato(id, plato);
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	// Borra un plato al restaurante, que contiene el ID introducido por
	// parametro
	// curl -i -X DELETE -H "Content-type: application/xml"
	// http://localhost:8080/api/restaurantes/plato/{id}/{nombre}
	@DELETE
	@Path("/plato/{id}/{idPlato}")
	@Consumes(MediaType.APPLICATION_JSON)
	@ApiResponses(value = { @ApiResponse(code = HttpServletResponse.SC_OK, message = ""),
			@ApiResponse(code = HttpServletResponse.SC_NOT_FOUND, message = "Restaurante no encontrado") })
	@Secured({ AvailableRoles.ADMIN, AvailableRoles.GESTOR })
	public Response removePlato(@ApiParam(value = "id del restaurante", required = true) @PathParam("id") String id,
			@ApiParam(value = "nombre del Plato", required = true) @PathParam("idPlato") String idPlato)
			throws Exception {
		servicio.removePlato(id, idPlato);
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	// Da de alta en el servicio de opiniones, una opinion para el restaurante
	// indicado como parametro
	// curl -i -X POST -H "Content-type: application/json"
	// http://localhost:8080/api/restaurantes/opiniones/alta/{id}
	@POST
	@Path("/opiniones/alta/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@ApiResponses(value = { @ApiResponse(code = HttpServletResponse.SC_OK, message = ""),
			@ApiResponse(code = HttpServletResponse.SC_NOT_FOUND, message = "Restaurante no encontrado") })
	@Secured({ AvailableRoles.ADMIN, AvailableRoles.GESTOR, AvailableRoles.CLIENTE })
	public Response altaServicioOpiniones(
			@ApiParam(value = "id del restaurante", required = true) @PathParam("id") String id) throws Exception {
		servicio.altaServicioOpiniones(id);
		return Response.status(Response.Status.NO_CONTENT).build();
	}

	// Consulta un restaurante a aprtir del parametro ID del gestor
	// curl -i -X GET -H "Content-type: application/xml"
	// http://localhost:8080/api/restaurantes/gestor/{id}
	@GET
	@Path("/gestor/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Consulta un restaurante", notes = "Retorna un restaurante utilizando su idGestor", response = Restaurante.class)
	@ApiResponses(value = { @ApiResponse(code = HttpServletResponse.SC_OK, message = ""),
			@ApiResponse(code = HttpServletResponse.SC_NOT_FOUND, message = "Restaurante no encontrado") })
	@Secured({ AvailableRoles.ADMIN, AvailableRoles.GESTOR })
	public Response getRestauranteByIdGestor(
			@ApiParam(value = "id del gestor", required = true) @PathParam("id") String id) throws Exception {

		return Response.status(Response.Status.OK).entity(servicio.getRestauranteByIdGestor(id)).build();
	}

	// Consulta todos los restaurantes
	// curl -i -X GET -H "Content-type: application/xml"
	// http://localhost:8080/api/restaurantes/all
	@GET
	@Path("/all")
	@Produces(MediaType.APPLICATION_JSON)
	@Secured({ AvailableRoles.ADMIN, AvailableRoles.GESTOR, AvailableRoles.CLIENTE })
	public Response getAllRestaurantes() throws Exception {
		return Response.status(Response.Status.OK).entity(servicio.getAll()).build();
	}

	// Consulta todos los restaurantes filtrando por parametros
	// curl -i -X GET -H "Content-type: application/xml"
	// http://localhost:8080/api/restaurantes/gestor/{id}
	@POST
	@Path("/filtros")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Secured({ AvailableRoles.ADMIN, AvailableRoles.GESTOR, AvailableRoles.CLIENTE })
	public Response getRestauranteFiltros(FiltrosDTO filtrosDTO) throws Exception {
		return Response.status(Response.Status.OK).entity(servicio.getAllFiltrado(filtrosDTO)).build();
	}

}
