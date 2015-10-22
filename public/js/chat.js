"use strict";

var socket = io.connect();

$('form').submit(function() {
  var msg = $('#message').val();
  console.log("msg : " + msg);
  //ダイス判定
  if(msg.match(/\dd\d/i)) {
    console.log("match")
    var dice1 = parseInt((msg.replace(/d\d+/i, "")).replace(/\s*[+]\s*\d+/i, ""));
    var dice2 = parseInt((msg.replace(/\d+d/i, "")).replace(/\s*[+]\s*\d+/i, ""));
    var dice  = 0;
    for(var i = dice1; i > 0; i--) {
      dice += Math.floor(Math.random() * (dice2 - 1)) + 1;
    }
    var diceMsg = "";
    if(msg.match(/\s*[+]\s*\d+/i)) {
      console.log("dice3");
      var dice3 = parseInt(msg.replace(/\d+d\d+\s*[+]\s*/i, ""));
      dice += dice3;
      diceMsg = " + " + dice3;
    }
    diceMsg = dice1 + "d" + dice2 + diceMsg + " = " + dice;
    console.log(diceMsg);
    socket.emit('msg chat', diceMsg);
    $('#message').val('');
    return false;
  }
  socket.emit('msg chat', msg);
  $('#message').val('');
  return false;
});

$('#msgExport').click(function() {
  console.log("export");
  socket.emit('msg export');
});

$('#msgDelete').click(function() {
  console.log("delete");
  socket.emit('msg delete');
});

socket.on('connect', function() {
  console.log("connect");
  socket.emit('msg update');
});

socket.on('msg chat', function(msg) {
  $('#messages').append($('<li>').text(msg));
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

socket.on('db drop', function() {
  $('#messages').empty();
});
