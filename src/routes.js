const path = require('path');
module.exports = function(app) {

    app.get('/',function(req,res){
        const options = {root: path.join(__dirname)};
        res.sendFile('server/views/login.html', options); 
    });

// ##################### PRUEBAS  #####################
var su = require('./js/servicios/ServicioUsuarios');
var usu = require('./js/beans/Usuario');

su.consultarUsuario4('6480d348e5f4150f8683f5fd');

// ##################### PRUEBAS  #####################


}
