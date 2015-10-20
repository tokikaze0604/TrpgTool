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
  socket.broadcast.emit('msg chat', 'a user entered');
  socket.on('disconnect', function() {
    socket.broadcast.emit('msg chat', 'a user exited');
  });

  socket.on('msg chat', function(msg) {
    console.log('message: ' + msg);
    socket.emit('msg chat', 'user ' + '> ' + msg);
    socket.broadcast.emit('msg chat', 'user ' + '> ' + msg);
    console.log("server");
  });

  /**
   * 接続したらDBのメッセージを表示
   */
  socket.on('msg update', function() {
    console.log("update");
    user.find(function(err,docs) {
      socket.emit('msg open', docs);
    });
  });

  /**
   * メッセージ送信
   */
  socket.on('msg send', function(msg) {
    console.log("message send");
    //DBに登録
    var pushUser = new user();
    pushUser.message = msg;
    pushUser.date = new Date();
    console.log(pushUser);
    pushUser.save(function(err) {
      if(err) {
        console.log(err);
      }
    });
  });

  /**
   * チャットログをエクスポート
   */
  socket.on('msg export', function() {
    console.log("export");
    var fs = require('fs');
    user.find({}, {_id:0, __v:0}, function(err,docs) {
      fs.writeFile('export.txt', docs, function(err) {
        console.log(err);
      });
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
