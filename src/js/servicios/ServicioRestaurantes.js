class ServicioRestaurantes{
    urlbase = 'http://localhost:8090/restaurantes';

    consultarRestaurante(id, token) {
        fetch(this.urlbase + '/' + id, 
              {
                  method: 'GET',
                  headers: {"Content-Type": "application/json", "Cookie": "jwt=" + token,},
              })
              .then(res => res.json())
              .then(function(res) {
                var restaurante = new Restaurante();
                restaurante.fromJson(res);
                restaurante.print();
              })
              .catch(err => console.log('Solicitud fallida', err));
    }
}


// PRUEBAS
servicio = new ServicioRestaurantes();
restaurante = new Restaurante();
restaurante.id = '648225188d53b91c1caf3586';
let token = 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4NWNiZWY0Zi01NTMyLTRiNjctYWEzMS05YmY3NTBhMTM1MTYiLCJpc3MiOiJQYXNhcmVsYSBadXVsIiwiZXhwIjoxNjg2MzM2ODQ2LCJzdWIiOiJSYXVsTHVqYW4iLCJ1c3VhcmlvIjoiUmF1bEx1amFuQHVtLmVzIiwicm9sIjoiQURNSU4ifQ.wxNf2U8kETd10EzaccOkv3ilqJwsFI6s9tY4pBK3hHk';
servicio.consultarRestaurante(restaurante.id, token);