package modelo.filtros.implementaciones;

import modelo.Restaurante;
import modelo.filtros.Specification;

public class FiltroCiudadRestaurantes implements Specification<Restaurante> {

	private String ciudad;

	public FiltroCiudadRestaurantes(String ciudad) {
		super();
		this.ciudad = ciudad;
	}

	@Override
	public boolean isSatisfied(Restaurante res) {
		return ciudad.equals(res.getCiudad());
	}

}
