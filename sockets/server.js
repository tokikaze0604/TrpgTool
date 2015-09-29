"use strict";

exports.onConnection = function (socket) {
  socket.emit('chat message', 'a user entered');
  socket.on('disconnect', function() {
    socket.emit('chat message', 'a user ecited');
  });
  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
    socket.emit('chat message', 'user ' + '> ' + msg);
  });

};
