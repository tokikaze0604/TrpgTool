"use strict";

exports.onConnection = function (socket) {
  socket.broadcast.emit('chat message', 'a user entered');
  socket.on('disconnect', function() {
    socket.broadcast.emit('chat message', 'a user exited');
  });
  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
    socket.emit('chat message', 'user ' + '> ' + msg);
    socket.broadcast.emit('chat message', 'user ' + '> ' + msg);
  });
};
