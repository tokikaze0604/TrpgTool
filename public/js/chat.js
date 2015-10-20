"use strict";

var socket = io.connect();

$('form').submit(function() {
  socket.emit('msg chat', $('#message').val());
  $('#message').val('');
  return false;
});

$('#msgExport').click(function() {
  console.log("export");
  socket.emit('msg export');
});

socket.on('connect', function() {
  console.log("connect");
  socket.emit('msg update');
});

socket.on('msg chat', function(msg) {
  $('#messages').append($('<li>').text(msg));
  socket.emit('msg send', msg);
  console.log("front");
});

socket.on('msg open', function(msg) {
  console.log("open");
  if(msg.length != 0) {
    $('#messages').empty();
    $.each(msg, function(key, value) {
      $('#messages').append($('<li>').text(value.message));
    });
  }
});
