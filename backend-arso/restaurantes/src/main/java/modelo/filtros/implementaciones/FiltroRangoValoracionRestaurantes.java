package modelo.filtros.implementaciones;

import modelo.Restaurante;
import modelo.filtros.Specification;

public class FiltroRangoValoracionRestaurantes implements Specification<Restaurante> {

	private double valoracionMin;
	private double valoracionMax;

	public FiltroRangoValoracionRestaurantes(double valoracionMin, double valoracionMax) {
		super();
		this.valoracionMin = valoracionMin;
		this.valoracionMax = valoracionMax;
	}

	@Override
	public boolean isSatisfied(Restaurante res) {
		double valoracion = res.getResumenValoracion() != null ? res.getResumenValoracion().getCalificacionMedia() : 0;
		return valoracion <= valoracionMax && valoracion >= valoracionMin;
	}

}
