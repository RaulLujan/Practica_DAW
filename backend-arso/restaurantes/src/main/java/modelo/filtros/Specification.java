package modelo.filtros;

import java.util.List;

public interface Specification<T> {

	boolean isSatisfied(T object);

	default Specification<T> and(List<Specification<T>> specifications) {
		return new AndSpecification(specifications);
	}

	default Specification<T> or(Specification<T>... specifications) {
		return new OrSpecification(specifications);
	}

	default Specification<T> not(Specification<T> specification) {
		return new NotSpecification(specification);
	}
}