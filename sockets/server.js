"use strict";

exports.onConnection = function (socket) {
  var express = require('express');
  var app = express();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);
  socket.on('chat message', function(msg) {
    io.emit('chat message', 'a' + '> ' + msg);
  });

};
