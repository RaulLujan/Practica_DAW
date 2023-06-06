class ServicioOpiniones{
    urlbase;

    constructor() {
        this.urlbase = 'http://localhost:5204/api/opiniones';;
    }

    consultarOpinon(id) {
        fetch(this.urlbase + id, 
            {
                method: 'GET',
                headers: {"Content-Type": "application/json",},
                body: body.toJson()
            })
            .then(res => res.json())
            .then(res=> {console.log(res);}
        );
    }
    
}