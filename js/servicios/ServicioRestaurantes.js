const Restaurante = require('../beans/Restaurante.js');

class ServicioRestaurantes{
    urlbase = 'http://localhost:8080/api/restaurantes';


    realizarPeticion(metodo, body){
        fetch(urlbase, 
        {
            method: metodo,
            headers: {"Content-Type": "application/json",},
            body: body.toJson()
        })
        .then(res => res.json())
        .then(res=> {
            console.log(res);
        });
    }

    crearRestaurante(restaurante){
        realizarPeticion('POST', restaurante);
    }
}