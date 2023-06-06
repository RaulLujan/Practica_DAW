package modelo.filtros;

import java.util.List;

public class AndSpecification<T> implements Specification<T> {

	private List<Specification<T>> specifications;

	public AndSpecification(List<Specification<T>> listSpecifications) {
		this.specifications = listSpecifications;
	}

	public boolean isSatisfied(T object) {
		return specifications.stream().allMatch(s -> {
			return s.isSatisfied(object);
		});
	}
}