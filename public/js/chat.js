"use strict";

var socket = io.connect();
var user = document.querySelectorAll("#userName")[0].innerHTML;
console.log("userName: " + user);

/**
 * メッセージ送信
 */
$('form').submit(function() {
  var msg = {
    "user": user,
    "message" : $('#message').val()
  };
  console.log(msg);
  //ダイス判定
  if(msg.message.match(/\dd\d/i)) {
    console.log("match");
    var dice1 = parseInt((msg.message.replace(/d\d+/i, "")).replace(/\s*[+]\s*\d+/i, ""));
    var dice2 = parseInt((msg.message.replace(/\d+d/i, "")).replace(/\s*[+]\s*\d+/i, ""));
    var dice  = 0;
    for(var i = dice1; i > 0; i--) {
      dice += Math.floor(Math.random() * (dice2 - 1)) + 1;
    }
    var diceMsg = "";
    if(msg.message.match(/\s*[+]\s*\d+/i)) {
      console.log("dice3");
      var dice3 = parseInt(msg.message.replace(/\d+d\d+\s*[+]\s*/i, ""));
      dice += dice3;
      diceMsg = " + " + dice3;
    }
    diceMsg = dice1 + "d" + dice2 + diceMsg + " = " + dice;
    console.log(diceMsg);
    msg.message = diceMsg;
  }
  socket.emit('msg chat', msg);
  $('#message').val('');
  return false;
});

/**
 * チャットログ出力
 */
$('#msgExport').click(function() {
  console.log("export");
  socket.emit('msg export');
});

/**
 * チャットログ削除
 */
$('#msgDelete').click(function() {
  console.log("delete");
  socket.emit('msg delete');
});

/**
 * 接続時にチャットログを確認
 */
socket.on('connect', function() {
  console.log("connect");
  socket.emit('msg update');
});

/**
 * メッセージ追加
 */
socket.on('msg chat', function(msg) {
  $('#messages').append($('<li>').text(msg));
  console.log("front");
});

/**
 * チャットログを反映
 */
socket.on('msg open', function(msg) {
  console.log("open");
  if(msg.length != 0) {
    $('#messages').empty();
    $.each(msg, function(key, value) {
      $('#messages').append($('<li>').text(value.message));
    });
  }
  console.log(user);
});

/**
 * チャットを削除
 */
socket.on('msg drop', function() {
  $('#messages').empty();
});
