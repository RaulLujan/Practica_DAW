package usuarios.repositorio;

import repositorio.RepositorioException;
import repositorio.implementaciones.memoria.RepositorioMemoria;
import usuarios.modelo.Rol;
import usuarios.modelo.Usuario;

//public class RepositorioUsuariosMemoria extends RepositorioMemoria<Usuario> {
//
//	public RepositorioUsuariosMemoria() {
//
//		// Datos iniciales
//
//		try {
//			Usuario usuario1 = new Usuario("Marcos", "marcos@um.es", "MarcosMenarguez", Rol.ADMIN);
//			this.add(usuario1);
//
//			Usuario usuario2 = new Usuario("Juan", "juan@um.es", "juanito", Rol.CLIENTE);
//			this.add(usuario2);
//			
//			Usuario usuario3 = new Usuario("RaulLujan", "RaulLujan@um.es", "RaulLujan", Rol.ADMIN);
//			this.add(usuario3);
//
//		} catch (RepositorioException e) {
//			e.printStackTrace(); // no debe suceder en un repositorio en memoria
//		}
//
//	}
//
//}
