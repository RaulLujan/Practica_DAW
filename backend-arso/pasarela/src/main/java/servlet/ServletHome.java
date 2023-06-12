package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;

import repositorio.RepositorioException;
import servicio.IServicio;
import servicio.factoria.FactoriaServicios;

@SuppressWarnings("serial")
public class ServletHome extends HttpServlet {

	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		IServicio servicio = FactoriaServicios.getServicio(IServicio.class);

		resp.setHeader("login", "RaulLujan");
		//resp.setHeader("pass", getServletInfo());

		redirectStrategy.sendRedirect(req, resp, "http://localhost:8090/restaurantes");

		try {
			servicio.findAll().forEach(System.out::println);
		} catch (RepositorioException e) {
			e.printStackTrace();
		}

		System.out.println("fin.");

		PrintWriter pw = resp.getWriter();
		pw.println("Servelt de prueba de las redirecciones");
	}
}