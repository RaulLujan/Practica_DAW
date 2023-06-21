var http = require('http');
var express = require('express');
var path = require('path');
var routes = require('./src/routes');


var app = express();
app.set('port', process.env.PORT || 3000);
//Quitar para entregar
app.disable('view cache');

app.set('views', path.join(__dirname, 'src/server/views')); 
app.set('view engine', 'hbs');

app.use('/', routes);
app.use(express.static(__dirname + '/src/public')); 

http.createServer(app).listen(app.get('port'), function(){
	console.log('Sistem ' + app.get('port'));
});

module.exports = app;





