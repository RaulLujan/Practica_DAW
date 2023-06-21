const express = require('express')
const router = express.Router()

const servicio = require('./js/servicios/ServicioUsuarios')

router.get('/', function(req, res, next) {
    res.redirect('http://localhost:8090/restaurantes')
});

router.get('/restaurantes', async function(req, res, next) {
    console.log(' PRE Llamada ===== ');
    const usuario = await servicio.consultarUsuario2('6480d348e5f4150f8683f5fd')

    console.log(usuario, usuario.nombre, usuario.email, ' ===== ');
    res.render('formRestaurante', {
        user: JSON.stringify(usuario),
    })
});

module.exports = router; 