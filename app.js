"use strict";

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var routes = require('./routes');
var serverSockets = require('./sockets/server.js');

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',routes.index);


io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

/*
io.on('connection', function(socket){
  io.emit('chat message', 'a user entered');
  socket.on('disconnect', function() {
    io.emit('chat message', 'a user ecited');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});
*/

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.sockets.on('connection', serverSockets.onConnection);
