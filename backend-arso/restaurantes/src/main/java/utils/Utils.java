package utils;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.UUID;




import dto.OpinionDTO;
import retrofit.opiniones.OpinionesRestClient;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.converter.scalars.ScalarsConverterFactory;

public class Utils {

	public static String createId() {

		return UUID.randomUUID().toString();

	}

	public static String httpUrlConnection(String metodo, String url, String body) throws Exception {
		URL urlCon = new URL(url);
		HttpURLConnection con = (HttpURLConnection) urlCon.openConnection();
		con.setRequestMethod(metodo);
		con.setRequestProperty("Content-Type", "application/json");
		con.setRequestProperty("Accept", "application/json");
		con.setDoOutput(true);

		String jsonInputString = body;

		try (OutputStream os = con.getOutputStream()) {
			byte[] input = jsonInputString.getBytes("utf-8");
			os.write(input, 0, input.length);
		}

		try (BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(), "utf-8"))) {
			StringBuilder response = new StringBuilder();
			String responseLine = null;
			while ((responseLine = br.readLine()) != null) {
				response.append(responseLine.trim().toString());
			}
			String respuesta = response.toString();
			respuesta = respuesta.substring(respuesta.indexOf('"') + 1, respuesta.lastIndexOf('"'));
			return respuesta;
		}
	}

	public static String retrofitOpinionesClient(String url, String nombre) throws Exception {
		OpinionDTO opinion = new OpinionDTO();
		opinion.setNombre(nombre);

		Retrofit retrofit = new Retrofit.Builder().baseUrl(url)
				.addConverterFactory(ScalarsConverterFactory.create())
				.addConverterFactory(GsonConverterFactory.create())
				.build();
		OpinionesRestClient service = retrofit.create(OpinionesRestClient.class);
		
		Response<String> response = service.createOpinion(opinion).execute();
		if (response.isSuccessful()) {
			return response.body();
		} else {
			throw new RuntimeException("Error Retorfit Opiniones Cliente");
		}
	}

}