package dto;

import com.google.gson.annotations.SerializedName;

public class FiltrosDTO {

	@SerializedName("nombre")
	private String nombre;

	@SerializedName("coorX")
	private Double coorX;

	@SerializedName("coorY")
	private Double coorY;

	@SerializedName("distancia")
	private Integer distancia;

	@SerializedName("valoracionMin")
	private Double valoracionMin;

	@SerializedName("valoracionMax")
	private Double valoracionMax;

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Double getCoorX() {
		return coorX;
	}

	public void setCoorX(Double coorX) {
		this.coorX = coorX;
	}

	public Double getCoorY() {
		return coorY;
	}

	public void setCoorY(Double coorY) {
		this.coorY = coorY;
	}

	public Integer getDistancia() {
		return distancia;
	}

	public void setDistancia(Integer distancia) {
		this.distancia = distancia;
	}

	public Double getValoracionMin() {
		return valoracionMin;
	}

	public void setValoracionMin(Double valoracionMin) {
		this.valoracionMin = valoracionMin;
	}

	public Double getValoracionMax() {
		return valoracionMax;
	}

	public void setValoracionMax(Double valoracionMax) {
		this.valoracionMax = valoracionMax;
	}

	@Override
	public String toString() {
		return "FiltrosDTO [nombre=" + nombre + ", coorX=" + coorX + ", coorY=" + coorY + ", distancia=" + distancia
				+ ", valoracionMin=" + valoracionMin + ", valoracionMax=" + valoracionMax + "]";
	}

}
