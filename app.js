var http = require('http');
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/src/server/views'); 
app.set('view engine', 'html');
app.use(express.static(__dirname + '/src/public')); 

require('./src/routes')(app); 
http.createServer(app).listen(app.get('port'), function(){
	console.log('Sistem ' + app.get('port'));
});



