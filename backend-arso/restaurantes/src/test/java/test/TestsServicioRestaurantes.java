package test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.util.LinkedList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import dto.FiltrosDTO;
import modelo.Plato;
import modelo.Restaurante;
import modelo.ResumenValoracion;
import servicio.IServicio;

public class TestsServicioRestaurantes {
	
	private static IServicio servicio =  new ServicioRestaurantesMock();

	private  Restaurante restaurante1 = new Restaurante();
	private  Restaurante restaurante2 = new Restaurante();
	private  Restaurante restaurante3 = new Restaurante();

	private  List<Plato> platos1 = new LinkedList<Plato>();
	private  List<Plato> platos2 = new LinkedList<Plato>();
	private  List<Plato> platos3 = new LinkedList<Plato>();

	private  Plato plato1 = new Plato();
	private  Plato plato2 = new Plato();
	private  Plato plato3 = new Plato();
	private  Plato plato4 = new Plato();
	private  Plato plato5 = new Plato();
	private  Plato plato6 = new Plato();
	private  Plato platoNoAsignadoInicialmente;
	

	@Before
	public void setup() throws Exception {

		servicio = new ServicioRestaurantesMock();
		((ServicioRestaurantesMock) servicio).resert();

		// --------- Creacion entidades ---------
		platos1 = new LinkedList<Plato>();
		platos2 = new LinkedList<Plato>();
		platos3 = new LinkedList<Plato>();

		// Restaurante 1
		plato1 = new Plato();
		plato1.setNombre("Michirones");
		plato1.setDescripcion("Unos ricos michirones acompañados de limón");
		plato1.setPrecio(15);
		platos1.add(plato1);
		plato2 = new Plato();
		plato2.setNombre("Pulpo a la gallega");
		plato2.setDescripcion("5 piezas de pulpo a la gallega");
		plato2.setPrecio(30);
		restaurante1 = new Restaurante();
		restaurante1.setNombre("Restaurante Paco");
		ResumenValoracion resumenValoracion = new ResumenValoracion();
		resumenValoracion.setCalificacionMedia(4.3);
		resumenValoracion.setNumValoracion(5);
		restaurante1.setIdGestor("1");
		restaurante1.setPlatos(platos1);

		// Restaurante 2
		plato3 = new Plato();
		plato3.setNombre("Mejillones al vapor");
		plato3.setDescripcion("Mejillones al vapor con nuestra salsa dulce de la casa");
		plato3.setPrecio(25);
		platos2.add(plato3);
		plato4 = new Plato();
		plato4.setNombre("Entrecot");
		plato4.setDescripcion("1kg de entrecot de vaca vieja maridado con especias");
		plato4.setPrecio(60);
		restaurante2 = new Restaurante();
		restaurante2.setNombre("Restaurante López");
		resumenValoracion.setCalificacionMedia(3.5);
		resumenValoracion.setNumValoracion(10);
		restaurante2.setIdGestor("2");
		restaurante2.setPlatos(platos2);

		// Restaurante 3
		plato5 = new Plato();
		plato5.setNombre("Mejillones al vapor");
		plato5.setDescripcion("Mejillones al vapor con nuestra salsa dulce de la casa");
		plato5.setPrecio(25);
		platos3.add(plato5);
		plato6 = new Plato();
		plato6.setNombre("Entrecot");
		plato6.setDescripcion("1kg de entrecot de vaca vieja maridado con especias");
		plato6.setPrecio(60);
		restaurante3 = new Restaurante();
		restaurante3.setNombre("Restaurante López");
		resumenValoracion.setCalificacionMedia(2);
		resumenValoracion.setNumValoracion(7);
		restaurante3.setIdGestor("3");
		restaurante3.setPlatos(platos3);

		// Plato asignado a ningun restaurante
		platoNoAsignadoInicialmente = new Plato();
		platoNoAsignadoInicialmente.setNombre("Macarrones con queso y jamón");
		platoNoAsignadoInicialmente
				.setDescripcion("Macarrones acompañados de una salsa de queso y jamón de la mejor calidad");
		platoNoAsignadoInicialmente.setPrecio(25);

		// --------- Servicio ---------
		// Creacion Restaurante

		String insertedIdRestaurante1 = servicio.create(restaurante1);
		assertFalse(insertedIdRestaurante1.equals(""));
		restaurante1.setId(insertedIdRestaurante1);
		Restaurante res = servicio.getRestaurante(restaurante1.getId());
		assertEquals(restaurante1.getNombre(), res.getNombre());
		assertEquals(restaurante1.getPlatos().size(), res.getPlatos().size());
		restaurante2.setId(servicio.create(restaurante2));
		restaurante3.setId(servicio.create(restaurante3));

	}

	@Test
	public void testActualizarRestaurante() throws Exception {
		restaurante1.setNombre("Casa Restaurante Paco");
		servicio.update(restaurante1);
		assertEquals(servicio.getRestaurante(restaurante1.getId()).getNombre(), restaurante1.getNombre());
	}

	@Test
	public void testConsultarSitiosTuristicosProximos() throws Exception {
		assertFalse(servicio.getSitiosTuristicosProximos(restaurante1.getId()).isEmpty());
	}

	@Test
	public void testCrearSitiosTuristicos() throws Exception {
		servicio.setSitiosTuristicosDestacados(restaurante1.getId(),
				servicio.getSitiosTuristicosProximos(restaurante1.getId()));
		assertFalse(servicio.getRestaurante(restaurante1.getId()).getSitiosTuristicos().isEmpty());
	}

	@Test
	public void testCrearPlato() throws Exception {
		servicio.addPlato(restaurante1.getId(), plato2);
		assertTrue(servicio.getRestaurante(restaurante1.getId()).getPlatos().size() == 2);
	}

	@Test
	public void testActualizarPlato() throws Exception {
		plato1.setPrecio(50);
		servicio.updatePlato(restaurante1.getId(), plato1);
		assertTrue(servicio.getRestaurante(restaurante1.getId()).getPlatos().stream()
				.anyMatch(p -> p.getNombre().equals(plato1.getNombre()) && p.getPrecio() == 50));
	}

	@Test
	public void testBorrarPlato() throws Exception {
		servicio.removePlato(restaurante1.getId(), plato1.getNombre());
		assertFalse(servicio.getRestaurante(restaurante1.getId()).getPlatos().stream()
				.anyMatch(p -> p.getNombre().equals(plato1.getNombre())));
	}

	@Test
	public void testAltaServicioOpiniones() throws Exception {
		servicio.altaServicioOpiniones(restaurante1.getId());
		assertNotNull(servicio.getRestaurante(restaurante1.getId()).getIdOpinion());
	}

	@Test
	public void testConsultarRestaurantePorGestor() throws Exception {
		assertEquals(servicio.getRestauranteByIdGestor(restaurante1.getIdGestor()).getId(), restaurante1.getId());
	}

	@Test
	public void testObtenerTodosRestauarantes() throws Exception {
		assertEquals(servicio.getAll().size(), 3);
	}

	@Test
	public void testFiltrarRestaurantes() throws Exception {
		FiltrosDTO filtros = new FiltrosDTO();
		filtros.setNombre("Paco");
		filtros.setValoracionMin(4.0);
		filtros.setValoracionMax(4.5);
		assertTrue(servicio.getAllFiltrado(filtros).stream().allMatch(
				r -> r.getNombre().indexOf("Paco") != -1 && r.getResumenValoracion().getCalificacionMedia() >= 4
						&& r.getResumenValoracion().getCalificacionMedia() <= 4.5));
	}

}
