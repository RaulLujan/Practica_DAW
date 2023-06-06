package modelo.filtros.implementaciones;

import modelo.Restaurante;
import modelo.filtros.Specification;

public class FiltroNombreParcialRestaurantes implements Specification<Restaurante> {

	private String nombreParcial;

	public FiltroNombreParcialRestaurantes(String nombreParcial) {
		super();
		this.nombreParcial = nombreParcial;
	}

	@Override
	public boolean isSatisfied(Restaurante res) {
		String nombre = res.getNombre();
		return nombre.indexOf(nombreParcial) != -1;
	}

}
