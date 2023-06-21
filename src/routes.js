const express = require('express')
const router = express.Router()
const jwt_decode = require('jwt-decode')

const servicio = require('./js/servicios/ServicioUsuarios')
const restauranteServicio = require('./js/servicios/ServicioRestaurantes')
const restauranteBean = require('./js/beans/Restaurante')

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
            res.redirect('back');
        }
    } else {
        res.clearCookie("jwt")
        res.clearCookie("userName")
        res.redirect('/');
    }
  }

router.get('/restaurantes', ensureIfLogged, async function(req, res, next) {
    console.log(' PRE Llamada COOKIE ===== ', req.cookies, res.cookie);
    console.log(' PRE Llamada ===== ');
    //const usuario = await servicio.consultarUsuario2('6480d348e5f4150f8683f5fd')
    //var restaurante = new restauranteBean.Restaurante();
    //restaurante.nombre = "XXXXXXXXXX"
    //restaurante.idGestor = "XXXXXXXXXXX"
    //restaurante.coordenadaX = 37.984
    //restaurante.coordenadaY = -1.128
    //restaurante.ciudad = "XXXXXXXXXXX"

    //const id = await restauranteServicio.crearRestaurante(restaurante, req.cookies.jwt)
    //console.log(id);
    //const reee = await restauranteServicio.consultarRestaurante(id, req.cookies.jwt)
    //console.log(reee);
    //console.log(usuario, usuario.nombre, usuario.email, ' ===== ');
    res.render('getListRestaurantes', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol,
        //user: JSON.stringify(usuario),
        //restaurantes: restaurantes,
    })
});

router.get('/incidencia', ensureIfLogged, async function(req, res, next) {
    res.render('formIncidencia', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol,
    })
});

router.get('/opinion', ensureIfLogged, async function(req, res, next) {
    res.render('formOpinion', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol,
    })
});

router.get('/plato', ensureIfLogged, async function(req, res, next) {
    res.render('formPlato', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol,
    })
});

router.get('/sitio_turistico', ensureIfLogged, async function(req, res, next) {
    res.render('formSitioTuristico', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol,
    })
});

router.get('/modRestaurante', ensureIfAdmin, async function(req, res, next) {
    res.render('formRestaurante', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol,
    })
});

router.get('/valoracion', ensureIfLogged, async function(req, res, next) {
    res.render('getValoracion', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol,
    })
});

router.get('/detalleRestaurante', ensureIfLogged, async function(req, res, next) {
    res.render('detalleRestaurante', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol,
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