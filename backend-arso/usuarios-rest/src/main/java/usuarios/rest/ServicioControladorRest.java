package usuarios.rest;

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


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import servicio.IServicio;
import servicio.factoria.FactoriaServicios;
import usuarios.modelo.Usuario;


@Api
@Path("usuarios")
public class ServicioControladorRest {

	private IServicio servicio = FactoriaServicios.getServicio(IServicio.class);

	@Context
	private UriInfo uriInfo;

	// Consulta un usuario a aprtir del parametro ID
	// curl -i -X GET -H "Content-type: application/xml"
	// http://localhost:8081/api/usuarios/{id}
	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Consulta un usuario", notes = "Retorna un usuario utilizando su id", response = Usuario.class)
	@ApiResponses(value = { @ApiResponse(code = HttpServletResponse.SC_OK, message = ""),
			@ApiResponse(code = HttpServletResponse.SC_NOT_FOUND, message = "usuario no encontrado") })
	public Response getUsuario(@ApiParam(value = "id del usuario", required = true) @PathParam("id") String id)
			throws Exception {

		return Response.status(Response.Status.OK).entity(servicio.getUsuario(id)).build();
	}

	// Crea un usuario a paritr de la informacion del body/fichero introducido
	// curl -i -X POST -H "Content-type: application/xml" -d @test-files/1.xml
	// http://localhost:8081/api/usuarios
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response create(Usuario usuario) throws Exception {
		String id = servicio.create(usuario);
		return Response.ok(id).build();
	}

	// Actualiza el usuario correspondiente al ID introdicido por parametro
	// a paritr de la informacion del body/fichero introducido
	// curl -i -X PUT -H "Content-type: application/xml" -d @test-files/1.xml
	// http://localhost:8081/api/usuarios/{id}
	@PUT
	@Path("/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	@ApiResponses(value = { @ApiResponse(code = HttpServletResponse.SC_OK, message = ""),
			@ApiResponse(code = HttpServletResponse.SC_NOT_FOUND, message = "usuario no encontrado") })
	public Response update(@ApiParam(value = "id del usuario", required = true) @PathParam("id") String id,
			Usuario usuario) throws Exception {
		Usuario usuarioID =  servicio.getUsuario(id);
		if (!usuarioID.getId().equals(usuario.getId()))
			throw new IllegalArgumentException("El identificador no coincide: " + id);
		servicio.update(usuario);
		return Response.status(Response.Status.NO_CONTENT).build();

	}

	// Borra un usuario a paritr del ID introducido por parametro
	// curl -i -X DELETE http://localhost:8081/api/usuarios/1
	@DELETE
	@Path("/{id}")
	@ApiResponses(value = { @ApiResponse(code = HttpServletResponse.SC_OK, message = ""),
			@ApiResponse(code = HttpServletResponse.SC_NOT_FOUND, message = "usuario no encontrado") })
	public Response removeusuario(
			@ApiParam(value = "id del usuario", required = true) @PathParam("id") String id) throws Exception {
		servicio.removeUsuario(id);
		return Response.status(Response.Status.NO_CONTENT).build();
	}
	
	// Consulta un usuario a aprtir del parametro oauth
	// curl -i -X GET -H "Content-type: application/xml"
	// http://localhost:8081/api/usuarios/oauth/{id}
	@GET
	@Path("/oauth/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@ApiOperation(value = "Consulta un usuario", notes = "Retorna un usuario utilizando su id", response = Usuario.class)
	@ApiResponses(value = { @ApiResponse(code = HttpServletResponse.SC_OK, message = ""),
			@ApiResponse(code = HttpServletResponse.SC_NOT_FOUND, message = "usuario no encontrado") })
	public Response getUsuarioByIdOauth(@ApiParam(value = "id del usuario", required = true) @PathParam("id") String id)
			throws Exception {

		return Response.status(Response.Status.OK).entity(servicio.findByOAuthId(id)).build();
	}
	
}
