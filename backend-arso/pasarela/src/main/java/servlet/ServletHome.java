package servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import repositorio.RepositorioException;
import servicio.IServicio;
import servicio.factoria.FactoriaServicios;


@SuppressWarnings("serial")
public class ServletHome extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
    	
    	IServicio servicio = FactoriaServicios.getServicio(IServicio.class);
		
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