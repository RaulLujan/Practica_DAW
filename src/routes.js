const express = require('express')
const router = express.Router()
const jwt_decode = require('jwt-decode')

const servicio = require('./js/servicios/ServicioUsuarios')
const restauranteServicio = require('./js/servicios/ServicioRestaurantes')
const restauranteBean = require('./js/beans/Restaurante')
const platoBean = require('./js/beans/Plato')
const filtroBean = require('./js/beans/Filtro')
const incidenciaBean = require('./js/beans/Incidencia')
const valoracionBean = require('./js/beans/Valoracion')

const opinionServicio = require('./js/servicios/ServicioOpiniones')

const incidenciaServicio = require('./js/servicios/ServicioIncidencias')


router.get('/', function(req, res, next) {
    incidenciaServicio.crearTablaIncidencias();
    res.redirect('http://localhost:8090/restaurantes')
});

function ensureIfLogged(req, res, next) {
    if(req.cookies.jwt) {
        var decoded = jwt_decode(req.cookies.jwt);
        res.cookie('jwt', req.cookies.jwt)
        res.cookie('userName', decoded.sub)
        res.cookie('userMail', decoded.usuario)
        res.usuario = { ...decoded };
        next();
    } else {
        res.clearCookie("jwt")
        res.clearCookie("userName")
        res.clearCookie("userMail")
        res.redirect('/');
    }
  }

  function ensureIfAdmin(req, res, next) {
    if(req.cookies.jwt) {
        var decoded = jwt_decode(req.cookies.jwt);
        res.cookie('jwt', req.cookies.jwt)
        res.cookie('userName', decoded.sub)
        res.cookie('userMail', decoded.usuario)
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
        res.clearCookie("userMail")
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

router.post('/restaurantes/filter', ensureIfLogged, async function(req, res, next) {
    /*
     * Falta aplicar los filtros, que lo tengo mockeado
    */
    //const restaurantes = await restauranteServicio.consultarAllRestaurantes(req.cookies.jwt);

    const filtro = new filtroBean.Filtro();
    if (req.body.nombre)
        filtro.nombre = req.body.nombre;
    if (req.body.ciudad)
        filtro.ciudad = req.body.ciudad;
    if (req.body.km){
        filtro.distancia = req.body.km;
        if(global.navigator.geolocation){
            var success = function(position){
                filtro.coorX = position.coords.latitude,
                filtro.coorY = position.coords.longitude;
            }
            global.navigator.geolocation.getCurrentPosition(success, function(msg){
            console.error( msg );
            });
        }
    }   
    if (req.body.valoracion) {
        filtro.valoracionMax = req.body.valoracion + 1;
        filtro.valoracionMin = req.body.valoracion;
    }
    const restaurantes = await restauranteServicio.consultarRestaurantesFiltrado(filtro, req.cookies.jwt);

    res.render('getPartialListRestaurantes', {
        restaurantes: restaurantes,
    })
});

router.post('/restaurantes', ensureIfLogged, async function(req, res, next) {
    res.setHeader('Accept', 'application/json');
    const filtro = new filtroBean.Filtro();
    if (req.body.nombre)
        filtro.nombre = req.body.nombre;
    if (req.body.ciudad)
        filtro.ciudad = req.body.ciudad;
    if (req.body.km){
        filtro.distancia = req.body.km;
        if(global.navigator.geolocation){
            var success = function(position){
                filtro.coorX = position.coords.latitude,
                filtro.coorY = position.coords.longitude;
            }
            global.navigator.geolocation.getCurrentPosition(success, function(msg){
            console.error( msg );
            });
        }
    }   
    if (req.body.valoracion) {
        filtro.valoracionMax = req.body.valoracion + 1;
        filtro.valoracionMin = req.body.valoracion;
    }

    const restaurantes = await restauranteServicio.consultarRestaurantesFiltrado(filtro, req.cookies.jwt);

    res.render('getListRestaurantes', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restaurantes: restaurantes,
    })
    //res.send({restaurantes: restaurantes});
    
});

router.get('/detalleRestaurante/:restauranteId', ensureIfLogged, async function(req, res, next) {
    if (!req.params.restauranteId) {
        res.redirect('/restaurantes')
    }

    const restaurante = await restauranteServicio.consultarRestaurante(req.params.restauranteId, req.cookies.jwt);
    const incidencias = await incidenciaServicio.consultarIncidenciasByRestaurante(req.params.restauranteId);
    console.log("#3" +incidencias)
    res.render('detalleRestaurante', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restaurante: restaurante,
        incidencias: incidencias,
        restauranteId: restaurante.id,
    })
});

router.get('/gestRestaurante', ensureIfAdmin, async function(req, res, next) {
    const restaurantes = await restauranteServicio.consultarAllRestaurantes(req.cookies.jwt);
    res.render('formRestaurante', {
        userName: req.cookies.userName ,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restaurantes: restaurantes,
    })
});

router.post('/gestRestaurante', ensureIfAdmin, async function(req, res, next) {
    res.setHeader('Accept', 'application/json');
    var restaurante = new restauranteBean.Restaurante();
    restaurante.nombre = req.body.nombre;
    restaurante.ciudad = req.body.ciudad;
    restaurante.coordenadaX = req.body.coordsX;
    restaurante.coordenadaY = req.body.coordsY;
    restaurante.descripcion = req.body.descripcion;

    retorno = await restauranteServicio.crearRestaurante(restaurante, req.cookies.jwt);

    const restaurantes = await restauranteServicio.consultarAllRestaurantes(req.cookies.jwt);
    res.send({restaurantes: restaurantes, message: 'Restaurante creado'});
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

    //try {
        retorno = await restauranteServicio.borrarRestaurante(req.params.restauranteId, req.cookies.jwt);
        //res.end(JSON.stringify({ message : retorno }));
    //} catch(e) {
      //res.status(500).send(JSON.stringify({ message : retorno }));
    //}

    const restaurantes = await restauranteServicio.consultarAllRestaurantes(req.cookies.jwt);
    res.render('formRestaurante', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restaurantes: restaurantes,
    })
});

router.get('/plato/:restauranteId', ensureIfLogged, async function(req, res, next) {
    res.render('formPlato', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restauranteId: req.params.restauranteId,
        accion : 'Añadir'
    })
});

router.get('/plato/:restauranteId/:platoId', ensureIfLogged, async function(req, res, next) {

    const plato = await restauranteServicio.consultarPlato(req.params.platoId, req.params.restauranteId, req.cookies.jwt);
    res.render('formPlato', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restauranteId: req.params.restauranteId,
        platoId: req.params.platoId,
        plato: plato,
        accion: 'Modificar',
    })
});


router.post('/plato', ensureIfLogged, async function(req, res, next) {
    res.setHeader('Accept', 'application/json');
    const plato = new platoBean.Plato();
    plato.nombre = req.body.nombre;
    plato.precio = req.body.precio;
    plato.disponible = req.body.disponibilidad;
    plato.descripcion = req.body.descripcion;
    var accion = req.body.accion
    if(accion === 'Modificar'){
        plato.id = req.body.platoId
        await restauranteServicio.modificarPlato(plato, req.body.restauranteId, req.cookies.jwt);
        res.send({ message: 'Plato modificado'});
    }else{
        await restauranteServicio.añadirPlato(plato, req.body.restauranteId, req.cookies.jwt);
        res.send({ message: 'Plato añadido'});
    }
});

router.get('/detallePlato/:restauranteId/:platoId', ensureIfLogged, async function(req, res, next) {
    const plato = await restauranteServicio.consultarPlato(req.params.platoId, req.params.restauranteId, req.cookies.jwt);
    res.render('detallePlato', {
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


router.post('/addsitios', ensureIfLogged, async function(req, res, next) {
    res.setHeader('Accept', 'application/json');
    const list =  req.body.listsitiosTuristicos;
    // Si obtenemos los indices de los sitios Turisticos seleccionados
    const listSelect = req.body.listSelect;

    // Recorremos la lista de indices seleccionados y agregamos los sitios turisticos a la lista final
    const listST = [];

    console.log("BBBBBBBBBBBBbb")
    console.log(listSelect)
    if(listSelect !== undefined){
        for (var i = 0; i < listSelect.length; i++) {
            listST.push(list[listSelect[i]])
        }
    }

   // await restauranteServicio.añadirSitiosTuristicosProximos(listST , req.body.restauranteId, req.cookies.jwt);
    res.send({message: 'Sitios Turisticos Agregados'});
});

router.get('/incidencia/:restauranteId/:platoId', ensureIfLogged, async function(req, res, next) {
    res.render('formIncidencia', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restauranteId: req.params.restauranteId,
        platoId: req.params.platoId,
    })
});

router.post('/incidencia', ensureIfLogged, async function(req, res, next) {
    res.setHeader('Accept', 'application/json');
    const incidencia = new incidenciaBean.Incidencia();
    incidencia.idUser = req.cookies.userName;
    incidencia.idRestaurante = req.body.restauranteId;
    incidencia.idPalto = req.body.platoId;
    incidencia.titulo = req.body.titulo;
    incidencia.descripcion = req.body.descripcion;
    await incidenciaServicio.insertarIncidencia(incidencia);
    res.send({message: 'Incidencia creada'});
});

router.get('/opinion/:restauranteId', ensureIfLogged, async function(req, res, next) {
    const restaurante = await restauranteServicio.consultarRestaurante(req.params.restauranteId, req.cookies.jwt);
    const valoracion = await opinionServicio.consultarValoracion(restaurante.idOpinion, req.cookies.userName);

    res.render('formOpinion', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restauranteId: req.params.restauranteId,
        valoracion: valoracion,
        nombreRestaurante: restaurante.nombre,
    })
});

router.post('/opinion', ensureIfLogged, async function(req, res, next) {
    res.setHeader('Accept', 'application/json');
    const restaurante = await restauranteServicio.consultarRestaurante(req.body.restauranteId, req.cookies.jwt);
    const valoracion = await opinionServicio.consultarValoracion(restaurante.idOpinion, req.cookies.userName);

    if(valoracion === undefined){
        valoracion = new valoracionBean.Valoracion();
    }

    valoracion.Correo = req.cookies.userMail
    valoracion.Calificacion = req.body.valorOpinion
    valoracion.Comentario = req.body.comentario
    valoracion.IdUser = req.cookies.userName

    valoracion.print()

    await opinionServicio.addValoracion(restaurante.idOpinion, valoracion);
    res.send({message: 'Opinion añadida'});
});

router.get('/valoracion/:restauranteId/:idOpinion', ensureIfLogged, async function(req, res, next) {
    const opinion = await opinionServicio.consultarOpinion(req.params.idOpinion);
    console.log("XXXXXXXXXXXXXXXXX - 2")
    console.log(opinion);
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
    sitio.imagenesUrls = sitio.imagenesUrls.map(el => { return { url: el } })

    res.render('detalleSitioTuristico', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restauranteId: req.params.restauranteId,
        sitioTuristico: sitio,
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