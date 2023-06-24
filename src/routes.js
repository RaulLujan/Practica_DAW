const express = require('express')
const router = express.Router()
const jwt_decode = require('jwt-decode')

const servicio = require('./js/servicios/ServicioUsuarios')
const restauranteServicio = require('./js/servicios/ServicioRestaurantes')
const restauranteBean = require('./js/beans/Restaurante')

const opinionServicio = require('./js/servicios/ServicioOpiniones')

const incidenciaServicio = require('./js/servicios/ServicioIncidencias')


router.get('/', function(req, res, next) {
    res.redirect('http://localhost:8090/restaurantes')
});

function ensureIfLogged(req, res, next) {
    if(req.cookies.jwt) {
        var decoded = jwt_decode(req.cookies.jwt);
        res.cookie('jwt', req.cookies.jwt)
        res.cookie('userName', decoded.sub)
        res.usuario = { ...decoded };
        next();
    } else {
        res.clearCookie("jwt")
        res.clearCookie("userName")
        res.redirect('/');
    }
  }

  function ensureIfAdmin(req, res, next) {
    if(req.cookies.jwt) {
        var decoded = jwt_decode(req.cookies.jwt);
        res.cookie('jwt', req.cookies.jwt)
        res.cookie('userName', decoded.sub)
        res.usuario = { ...decoded };
        if (decoded.rol === "ADMIN"){
            next();
        } else {
            console.error('No tiene permisos para ver esta pagina');
            res.status(401).send('No tiene permisos para ver esta pagina');
        }
    } else {
        res.clearCookie("jwt")
        res.clearCookie("userName")
        res.redirect('/');
    }
  }

router.get('/restaurantes', ensureIfLogged, async function(req, res, next) {
    const restaurantes = await restauranteServicio.consultarAllRestaurantes(req.cookies.jwt);
    res.render('getListRestaurantes', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restaurantes: restaurantes,
    })
});

router.get('/detalleRestaurante/:restauranteId', ensureIfLogged, async function(req, res, next) {
    if (!req.params.restauranteId) {
        res.redirect('/restaurantes')
    }

    const restaurante = await restauranteServicio.consultarRestaurante(req.params.restauranteId, req.cookies.jwt);
    const incidencias = await incidenciaServicio.consultarIncidenciasByRestaurante(req.params.restauranteId);
    res.render('detalleRestaurante', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restaurante: restaurante,
        incidencias: incidencias,
    })
});

router.get('/gestRestaurante', ensureIfAdmin, async function(req, res, next) {
    const restaurantes = await restauranteServicio.consultarAllRestaurantes(req.cookies.jwt);
    res.render('formRestaurante', {
        userName: req.cookies.userName ,
        userRol: res?.usuario?.rol === "ADMIN" ? true : false,
        restaurantes: restaurantes,
    })
});

router.post('/gestRestaurante', ensureIfAdmin, async function(req, res, next) {
    //res.setHeader('Accept', 'application/json');
    //res.setHeader('Content-Type', 'application/json');

    var restaurante = new restauranteBean.Restaurante();
    restaurante.nombre = req.body.nombre;
    restaurante.ciudad = req.body.ciudad;
    restaurante.coordenadaX = req.body.coordsX;
    restaurante.coordenadaY = req.body.coordsY;
    restaurante.desccripcion = req.body.desccripcion;

    try {
        retorno = await restauranteServicio.borrarRestaurante(req.params.restauranteId, req.cookies.jwt);
        res.end(JSON.stringify({ message : retorno }));
    } catch(e) {
        res.status(500).send(JSON.stringify({ message : retorno }));
    }

    const restaurantes = await restauranteServicio.consultarAllRestaurantes(req.cookies.jwt);
    res.render('formRestaurante', {
        userName: req.cookies.userName,
        userRol: res?.usuario?.rol === "ADMIN" ? true : false,
        restaurantes: restaurantes,
    })
});

router.get('/modRestaurante/:restauranteId', ensureIfAdmin, async function(req, res, next) {
    if (!req.params.restauranteId) {
        res.redirect('/gestRestaurante')
    }

    const restaurante = await restauranteServicio.consultarRestaurante(req.params.restauranteId, req.cookies.jwt);
    res.render('modRestaurante', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restaurante: restaurante,
    })
});

router.get('/borrarRestaurante/:restauranteId', ensureIfAdmin, async function(req, res, next) {
    if (!req.params.restauranteId) {
        res.redirect('/gestRestaurante')
    }

    try {
        retorno = await restauranteServicio.borrarRestaurante(req.params.restauranteId, req.cookies.jwt);
        res.end(JSON.stringify({ message : retorno }));
    } catch(e) {
        res.status(500).send(JSON.stringify({ message : retorno }));
    }

    const restaurantes = await restauranteServicio.consultarAllRestaurantes(req.cookies.jwt);
    res.render('formRestaurante', {
        userName: req.cookies.userName,
        userRol: res?.usuario?.rol === "ADMIN" ? true : false,
        restaurantes: restaurantes,
    })
});

router.get('/plato/:restauranteId', ensureIfLogged, async function(req, res, next) {
    res.render('formPlato', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restauranteId: req.params.restauranteId,
    })
});

router.get('/plato/:restauranteId/:platoId', ensureIfLogged, async function(req, res, next) {
    const plato = await restauranteServicio.consultarPlato(req.params.platoId, req.params.restauranteId, req.cookies.jwt);
    
    res.render('formPlato', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restauranteId: req.params.restauranteId,
        plato: plato,
    })
});

router.get('/delPlato/:restauranteId/:platoId', ensureIfLogged, async function(req, res, next) {
    try{
        await restauranteServicio.borrarPlato(req.params.platoId, req.params.restauranteId, req.cookies.jwt);
        res.end(JSON.stringify({ message : retorno }));
    } catch(e) {
        res.status(500).send(JSON.stringify({ message : retorno }));
    }

    const restaurante = await restauranteServicio.consultarRestaurante(req.params.restauranteId, req.cookies.jwt);
    res.render('modRestaurante', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restaurante: restaurante,
    })
});

router.get('/delsitioturistico/:restauranteId/:sitioId', ensureIfLogged, async function(req, res, next) {
    try{
        await restauranteServicio.borrarSitioTuristico(req.params.sitioId, req.params.restauranteId, req.cookies.jwt);
        res.end(JSON.stringify({ message : retorno }));
    } catch(e) {
        res.status(500).send(JSON.stringify({ message : retorno }));
    }

    const restaurante = await restauranteServicio.consultarRestaurante(req.params.restauranteId, req.cookies.jwt);
    res.render('modRestaurante', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restaurante: restaurante,
    })
});

router.get('/addsitios/:restauranteId', ensureIfLogged, async function(req, res, next) {
    const sitios = await restauranteServicio.consultarSitiosTuristicosProximos(req.params.restauranteId, req.cookies.jwt);
    res.render('formSitioTuristico', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restauranteId: req.params.restauranteId,
        sitiosTuristicos: sitios,
    })
});

router.get('/incidencia/:restauranteId/:platoId', ensureIfLogged, async function(req, res, next) {
    res.render('formIncidencia', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restauranteId: req.params.restauranteId,
        platoId: req.params.platoId,
    })
});

router.get('/opinion/:restauranteId', ensureIfLogged, async function(req, res, next) {
    const valoracion = await opinionServicio.consultarValoracion(req.params.restauranteId, req.cookies.userName);
    const restaurante = await restauranteServicio.consultarRestaurante(req.params.restauranteId, req.cookies.jwt);
    
    res.render('formOpinion', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restauranteId: req.params.restauranteId,
        valoracion: valoracion,
        nombreRestaurante: restaurante.nombre,
    })
});

router.get('/valoracion/:restauranteId', ensureIfLogged, async function(req, res, next) {
    const opinion = await opinionServicio.consultarOpinion(req.params.restauranteId);
    const restaurante = await restauranteServicio.consultarRestaurante(req.params.restauranteId, req.cookies.jwt);
    res.render('getValoracion', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restauranteId: req.params.restauranteId,
        valoraciones: opinion.valoraciones,
        nombreRestaurante: restaurante.nombre,
    })
});

router.get('/sitioturistico/:restauranteId/:sitioId', ensureIfLogged, async function(req, res, next) {
    const sitio = await restauranteServicio.consultarSitio(req.params.sitioId, req.params.restauranteId, req.cookies.jwt);

    res.render('detalleSitioTuristico', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restauranteId: req.params.restauranteId,
        sitioTuristico: sitio,
    })
});

router.get('/platos/:restauranteId/:platoId', ensureIfLogged, async function(req, res, next) {
    const plato = await restauranteServicio.consultarPlato(req.params.platoId, req.params.restauranteId, req.cookies.jwt);
    res.render('detallePlato', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restauranteId: req.params.restauranteId,
        plato: plato,
    })
});

router.get('/buscarRestaurantes', ensureIfLogged, async function(req, res, next) {
    if (!req.query.nombre && !req.query.ciudad && !req.query.distancia && !req.query.valoracion) {
        res.redirect('/restaurantes')
    }
    
    const filtro = new filtroBean.Filtro();
    if (req.query.nombre)
        filtro.nombre = req.query.nombre;
    if (req.query.ciudad)
        filtro.ciudad = req.query.ciudad;
    if (req.query.distancia){
        filtro.distancia = req.query.distancia;
        if(navigator.geolocation){
            var success = function(position){
                filtro.coorX = position.coords.latitude,
                filtro.coorY = position.coords.longitude;
            }
            navigator.geolocation.getCurrentPosition(success, function(msg){
            console.error( msg );
            });
        }
    }   
    if (req.query.valoracion)
        filtro.valoracion = req.query.valoracion;

    console.log("XXXXXXXXXXXXXXXXXXXXX " + filtro.nombre);
    const restaurantes = await restauranteServicio.consultarRestaurantesFiltrado(filtro, req.cookies.jwt);
    console.log(restaurantes);
    res.render('getListRestaurantes', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restaurantes: restaurantes,
    })
    
});



router.get('/logout', ensureIfLogged, async function(req, res, next) {
    res.clearCookie("jwt")
    res.clearCookie("userName")
    res.redirect('https://github.com/logout')
    res.end()
});

/*
router.get('/whoami', ensureIfLogged, async function(req, res, next) {
    res.render('formIncidencia')
});
*/

module.exports = router; 