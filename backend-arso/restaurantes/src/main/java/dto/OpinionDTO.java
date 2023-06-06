package dto;

import com.google.gson.annotations.SerializedName;

public class OpinionDTO {

	@SerializedName("Nombre")
	private String nombre;

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

}
