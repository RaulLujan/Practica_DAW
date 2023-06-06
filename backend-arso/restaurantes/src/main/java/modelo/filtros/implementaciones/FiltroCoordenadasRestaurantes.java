package modelo.filtros.implementaciones;

import modelo.Restaurante;
import modelo.filtros.Specification;

public class FiltroCoordenadasRestaurantes implements Specification<Restaurante> {

	private double x, y;
	private double distanciaMaxima;

	public FiltroCoordenadasRestaurantes(double x, double y, double distanciaMaxima) {
		super();
		this.x = x;
		this.y = y;
		this.distanciaMaxima = distanciaMaxima;
	}

	@Override
	public boolean isSatisfied(Restaurante res) {
		double lat = res.getCoordenadas().getPosition().getValues().get(0);
		double lng = res.getCoordenadas().getPosition().getValues().get(1);
		double distancia = Math.sqrt(Math.pow(lat - x, 2) + Math.pow(lng - y, 2));
		return distancia <= distanciaMaxima;
	}

}
