"use strict";

/**
 * mongoose
 */
var mongoose   = require('mongoose');
var schema     = mongoose.Schema;
var userSchema = new schema({
  message: String,
  date: Date
});
mongoose.model('User', userSchema);
mongoose.connect('mongodb://localhost/chat_db');
var user = mongoose.model('User');

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

  /**
   * 接続したらDBのメッセージを表示
   */
   /*
  socket.on('message update', function() {
    user.find(function(err,docs) {
      socket.emit('message open', docs);
    });
  });
  */

  /**
   * メッセージ送信
   */
  socket.on('massage send', function(msg) {
    socket.emit('message push', msg);
    socket.broadcast.emit('message push', msg);
    //DBに登録
    var pushUser = new user();
    pushUser.message = msg;
    pushUser.date = new Date();
    pushUser.save(function(err) {
      if(err) {
        console.log(err);
      }
    });
  });


  /**
   * DBのメッセージを削除
   */
   /*
   socket.on('deleteDB', function() {
     socket.emit('db drop');
     socket.broadcast.emit('db drop');
     user.find().remove();
   });
   */

};
