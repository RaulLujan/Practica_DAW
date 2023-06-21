const express = require('express')
const router = express.Router()
const jwt_decode = require('jwt-decode')

const servicio = require('./js/servicios/ServicioUsuarios')
const restauranteServicio = require('./js/servicios/ServicioRestaurantes')

router.get('/', function(req, res, next) {
    res.redirect('http://localhost:8090/restaurantes')
});

function ensureIfLogged(req, res, next) {
    if(req.cookies.jwt) {
        var decoded = jwt_decode(req.cookies.jwt);
        res.cookie('jwt', req.cookies.jwt)
        res.cookie('userName', decoded.sub)
        console.log(decoded);
        res.usuario = { ...decoded };
        next();
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
    //const restaurantes = await restauranteServicio.consultarAllRestaurantes(req.cookies.jwt)

    //console.log(usuario, usuario.nombre, usuario.email, ' ===== ');
    res.render('formRestaurante', {
        userName: req.cookies.userName,
        //user: JSON.stringify(usuario),
        //restaurantes: restaurantes,
    })
});

router.get('/incidencia', ensureIfLogged, async function(req, res, next) {
    res.render('formIncidencia', {
        userName: req.cookies.userName,
    })
});

router.get('/opinion', ensureIfLogged, async function(req, res, next) {
    res.render('formOpinion', {
        userName: req.cookies.userName,
    })
});

router.get('/plato', ensureIfLogged, async function(req, res, next) {
    res.render('formPlato', {
        userName: req.cookies.userName,
    })
});

router.get('/sitio_turistico', ensureIfLogged, async function(req, res, next) {
    res.render('formSitioTuristico', {
        userName: req.cookies.userName,
    })
});

router.get('/ver_opinion', ensureIfLogged, async function(req, res, next) {
    res.render('getOpinion', {
        userName: req.cookies.userName,
    })
});

router.get('/valoracion', ensureIfLogged, async function(req, res, next) {
    res.render('getValoracion', {
        userName: req.cookies.userName,
    })
});

router.get('/detalleRestaurante', ensureIfLogged, async function(req, res, next) {
    res.render('detalleRestaurante', {
        userName: req.cookies.userName,
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