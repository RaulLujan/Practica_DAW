package test;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

import dto.FiltrosDTO;
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
import repositorio.implementaciones.memoria.RepositorioMemoria;
import servicio.IServicio;
import utils.Constantes;

public class ServicioRestaurantesMock implements IServicio {

	private RepositorioRestaurantes repositorio = FactoriaRepositorios.getRepositorio(Restaurante.class,
			Constantes.PROPERTIES_REPOSITORIOS_PRUEBAS);
	private static int idOpiniones = 1;

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
		List<SitioTuristico> lista = new LinkedList<SitioTuristico>();
		SitioTuristico sitioTuristico1 = new SitioTuristico();
		sitioTuristico1.setNombre("Sitio turistico 1");
		sitioTuristico1.setDescripcion("Esto es el sitio turistico 1");
		lista.add(sitioTuristico1);
		SitioTuristico sitioTuristico2 = new SitioTuristico();
		sitioTuristico1.setNombre("Sitio turistico 2");
		sitioTuristico1.setDescripcion("Esto es el sitio turistico 2");
		lista.add(sitioTuristico2);
		return lista;

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

		restaurante.setIdOpinion(Integer.toString(idOpiniones++));
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
			listaSpecifications.add(
					new FiltroCoordenadasRestaurantes(filtros.getCoorX(), filtros.getCoorY(), filtros.getDistancia()));

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

	public void resert() {
		((RepositorioMemoria) this.repositorio).resert();
	}

}
