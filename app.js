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
var mongoStore     = require('connect-mongo')(session);
var http           = require('http').Server(app);
var io             = require('socket.io')(http);
var routes         = require('./routes');
var serverSockets  = require('./sockets/server.js');


/**
 * Configuration
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
  store: new mongoStore ({
    db: 'session',
    host: 'localhost',
    clear_interval: 60 * 60
  }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    maxAge: new Date(Date.now() + 60 * 60 * 1000)
  }
}));

/**
 * Routing
 */

 var loginCheck = function(req, res, next) {
    if(req.session.user){
      next();
    }else{
      res.redirect('/login');
    }
};

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
