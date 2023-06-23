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
    res.render('detalleRestaurante', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
        restaurante: restaurante,
    })
});

router.get('/incidencia', ensureIfLogged, async function(req, res, next) {
    res.render('formIncidencia', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
    })
});

router.get('/opinion', ensureIfLogged, async function(req, res, next) {
    res.render('formOpinion', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
    })
});

router.get('/plato', ensureIfLogged, async function(req, res, next) {
    res.render('formPlato', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
    })
});

router.get('/addsitios', ensureIfLogged, async function(req, res, next) {
    res.render('formSitioTuristico', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
    })
});

router.get('/gestRestaurante', ensureIfAdmin, async function(req, res, next) {
    res.render('formRestaurante', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
    })
});

router.get('/modRestaurante', ensureIfAdmin, async function(req, res, next) {
    res.render('modRestaurante', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
    })
});

router.get('/valoracion', ensureIfLogged, async function(req, res, next) {
    res.render('getValoracion', {
        userName: req.cookies.userName,
        userRol: res.usuario.rol === "ADMIN" ? true : false,
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