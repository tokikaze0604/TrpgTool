"use strict";

/**
 * mongoose
 */
var mongoose   = require('mongoose');
var schema     = mongoose.Schema;
var chatSchema = new schema({
  message: String,
  date: Date
});
mongoose.model('Chat', chatSchema);
mongoose.connect('mongodb://localhost/chat_db');
var chat = mongoose.model('Chat');

exports.onConnection = function (socket) {
  socket.broadcast.emit('msg chat', 'a user entered');
  socket.on('disconnect', function() {
    socket.broadcast.emit('msg chat', 'a user exited');
  });

  socket.on('msg chat', function(msg) {
    console.log(msg);
    var msg = msg.user + ' > ' + msg.message;
    socket.emit('msg chat', msg);
    socket.broadcast.emit('msg chat', msg);
    // DBに登録
    var pushMsg = new chat();
    pushMsg.message = msg;
    pushMsg.date = new Date();
    console.log(pushMsg);
    pushMsg.save(function(err) {
      if(err) {
        console.log(err);
      }
    });
    console.log("server");
  });

  /**
   * 接続したらDBのメッセージを表示
   */
  socket.on('msg update', function() {
    console.log("update");
    chat.find(function(err,docs) {
      socket.emit('msg open', docs);
    });
  });

  /**
   * チャットログをエクスポート
   */
  socket.on('msg export', function() {
    console.log("export");
    var fs = require('fs');
    chat.find({}, {_id:0, __v:0}, function(err,docs) {
      fs.writeFile('export.txt', docs, function(err) {
        console.log(err);
      });
    });
  });

  /**
   * DBのメッセージを削除
   */
   socket.on('msg delete', function() {
     console.log("delete");
     socket.emit('msg drop');
     socket.broadcast.emit('msg drop');
     chat.remove({}, function(err, result) {
       if(err) {
         console.log(err);
       } else {
         console.log(result);
       }
     });
   });

};
