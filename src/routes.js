const express = require('express')
const router = express.Router()

const servicio = require('./js/servicios/ServicioUsuarios')
const restauranteServicio = require('./js/servicios/ServicioRestaurantes')

router.get('/', function(req, res, next) {
    res.redirect('http://localhost:8090/restaurantes')
});

function ensureIfLogged(req, res, next) {
    if(req.cookies.jwt) {
        /*
        var decoded = jwt_decode(req.cookies.jwt);
        res.sub = { decoded.sub };
        res.usuario = { ...decoded };
        */
      res.cookie('jwt', req.cookies.jwt)
      next(); // allow the next route to run
    } else {
      // require the user to log in
      res.clearCookie();
      res.redirect('/');
    }
  }

router.get('/restaurantes', ensureIfLogged, async function(req, res, next) {
    console.log(' PRE Llamada COOKIE ===== ', req.cookies, res.cookie);
    console.log(' PRE Llamada ===== ');
    //const usuario = await servicio.consultarUsuario2('6480d348e5f4150f8683f5fd')
    const restaurantes = await restauranteServicio.consultarAllRestaurantes(req.cookies.jwt)

    //console.log(usuario, usuario.nombre, usuario.email, ' ===== ');
    res.render('formRestaurante', {
        //user: JSON.stringify(usuario),
        restaurantes: restaurantes,
    })
});

router.get('/incidencia', ensureIfLogged, async function(req, res, next) {
    res.render('formIncidencia')
});

router.get('/opinion', ensureIfLogged, async function(req, res, next) {
    res.render('formOpinion')
});

router.get('/plato', ensureIfLogged, async function(req, res, next) {
    res.render('formPlato')
});

router.get('/sitio_turistico', ensureIfLogged, async function(req, res, next) {
    res.render('formSitioTuristico')
});

router.get('/ver_opinion', ensureIfLogged, async function(req, res, next) {
    res.render('getOpinion')
});

router.get('/valoracion', ensureIfLogged, async function(req, res, next) {
    res.render('getValoracion')
});

/*
router.get('/whoami', ensureIfLogged, async function(req, res, next) {
    res.render('formIncidencia')
});
*/

module.exports = router; 