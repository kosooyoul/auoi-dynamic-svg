'use strict'

var config = require('./config');
var codes = require('./consts/codes');

// constants
var NAME = config.name;
var PORT = config.port;

// libs
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');

// web settings
var app = express();
var compression = require('compression');
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser("(secret)"));
app.use(flash());

// Use EJS(Embedded JavaScript templates)
var ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);

// headers
app.use(function(req, res, next) {
	req.context = {
		appid: req.header('app-client-id'),
		token: req.header('authorization'),
		referer: req.headers.referer
	};
	// req.referer = req.header('referer');
	// if (req.referer.startsWith("https://www.auoi.net/") == false) {
	// 	console.log(new Date(), "API." + NAME, "Invalid Referer: " + req.referer);
	// 	res.status(404);
	// 	res.json({'success': false, 'code': codes.NOT_FOUND, 'message': 'not found'});
	// 	return;
	// }

	res.header("Server", "Auoi");
	res.header("X-Powered-By", "Auoi");

	res.header("X-Frame-Options", "SAMEORIGIN");
	res.header("X-XSS-Protection" , "1; mode=block");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

	// cros
	res.header("Access-Control-Allow-Origin", "https://www.auoi.net");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");

	next();
});

// static routes
// app.use('/assets', express.static(__dirname + '/assets'));

// api routes
app.use('/svg/', require('./routes/svgs/controller.js'));
app.use('/', require('./routes/root/controller.js'));

// not found
app.use(function(req, res, next) {
	res.status(404);

	res.json({'success': false, 'code': codes.NOT_FOUND, 'message': 'not found'});

	next();
});

// internal server error
app.use(function(err, req, res, next) {
	res.status(err.status || 500);

	res.json({'success': false, 'code': codes.UNKNOWN_ERROR, 'message': 'undefined error'});
});

// start server
app.listen(PORT, function() {
	console.log(new Date(), "API." + NAME, 'Start API Server, Listen ' + PORT);
});
