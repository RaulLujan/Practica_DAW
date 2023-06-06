package modelo.filtros;

public class TrueSpecification<T> implements Specification<T> {

	@Override
	public boolean isSatisfied(T object) {
		return true;
	}

}
