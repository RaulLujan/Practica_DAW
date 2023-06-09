var http = require('http');
var express = require('express');
var path = require('path');
var routes = require('./src/routes');
const cookieParser = require("cookie-parser");
var hbs =  require('express-handlebars');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);
//Quitar para entregar
//app.disable('view cache');

app.set('views', path.join(__dirname, 'src/server/views')); 
app.set('view engine', 'hbs');

app.engine('hbs', hbs.engine({
	extname: 'hbs',
	defaultLayout: false,
	helpers: {
		ifeq: function(a, b, options){
			if (a === b) {
				return options.fn(this);
			}
			return options.inverse(this);
		},
	},
}))

app.use(cookieParser());
app.use('/', routes);
app.use(express.static(__dirname + '/src/public')); 

http.createServer(app).listen(app.get('port'), function(){
	console.log('System ' + app.get('port'));
});

module.exports = app;

