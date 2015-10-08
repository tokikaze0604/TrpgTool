"use strict";

/**
 * Module dependencies
 */

var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');
var http           = require('http').Server(app);
var io             = require('socket.io')(http);
var routes         = require('./routes');
var serverSockets  = require('./sockets/server.js');


/**
 * Configuratio
 */
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: null
}));

/**
 * Routing
 */

app.get('/',routes.index);

/**
 * functions
 */

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});

io.sockets.on('connection', serverSockets.onConnection);
