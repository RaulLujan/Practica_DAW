package retrofit.opiniones;

import dto.OpinionDTO;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;


public interface OpinionesRestClient {
	
	@POST("opiniones")
	Call<String> createOpinion(@Body OpinionDTO opinion);


}
