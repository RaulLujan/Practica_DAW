package modelo.filtros;

public interface Specificable<T> {

	boolean satisfies(Specification<T> object);
}