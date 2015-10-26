"use strict";

/**
 * mongoose
 */
 var mongodb = require('mongodb');
var mongoose   = require('mongoose');
var schema     = mongoose.Schema;
var chatSchema = new schema({
  message : String,
  "date"    : Date
});
mongoose.model('Chat', chatSchema);
var docSchema = new schema({
  "name"        : String, //探索者名
  "player"      : String, //プレイヤー名
  "job"         : String, //職業
  "degree"      : String, //学校・学位
  "graduate"    : String, //出身
  "disorder"    : String, //精神的な障害
  "sex"         : String, //性別
  "age"         : String, //年齢
  "str"         : Number,
  "con"         : Number,
  "siz"         : Number,
  "dex"         : Number,
  "app"         : Number,
  "san"         : Number,
  "int"         : Number,
  "pow"         : Number,
  "edu"         : Number,
  "idea"        : Number, //アイデア
  "luck"        : Number, //幸運
  "knowledge"   : Number, //知識
  "maxSanity"   : Number, //最大正気度
  "damageBonus" : String,  //ダメージ・ボーナス
  "sanity"      : Number, //正気度ポイント
  "mp"          : Number, //マジック・ポイント
  "hp"          : Number, //耐久力
  "memo"        : String   //特記事項等
});
mongoose.model('Document', docSchema);
mongoose.connect('mongodb://localhost/chat_db');
var chat = mongoose.model('Chat');
var doc = mongoose.model('Document');

exports.onConnection = function (socket) {
  /**
   * チャット
   */
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
   /**************************************************************
    * 資料
    *************************************************************/
   socket.on('item push', function(req) {
     // DBに登録
     var pushDoc = new doc();
     pushDoc.name = req.name;
     pushDoc.player = req.player;
     pushDoc.job = req.job;
     pushDoc.degree = req.degree;
     pushDoc.graduate = req.graduate;
     pushDoc.disorder = req.disorder;
     pushDoc.sex = req.sex;
     pushDoc.age = req.age;
     pushDoc.str = req.str;
     pushDoc.con = req.con;
     pushDoc.siz = req.siz;
     pushDoc.dex = req.dex;
     pushDoc.app = req.app;
     pushDoc.san = req.san;
     pushDoc.int = req.int;
     pushDoc.pow = req.pow;
     pushDoc.edu = req.edu;
     pushDoc.idea = req.idea;
     pushDoc.luck = req.luck;
     pushDoc.knowledge = req.knowledge;
     pushDoc.maxSanity = req.maxSanity;
     pushDoc.damageBonus = req.damageBonus;
     pushDoc.sanity = req.sanity;
     pushDoc.mp = req.mp;
     pushDoc.hp = req.hp;
     pushDoc.memo = req.memo;
     pushDoc.save(function(err) {
       if(err) {
         console.log(err);
       }
     });
   });

   socket.on('item update', function(req) {
     // DBに登録
     var updateDoc = new doc();
     doc.findOne({_id : req.id}, function(err, updateDoc) {
       if(err || updateDoc == null){
         return;
       }
       updateDoc.name = req.item.name;
       updateDoc.player = req.item.player;
       updateDoc.job = req.item.job;
       updateDoc.degree = req.item.degree;
       updateDoc.graduate = req.item.graduate;
       updateDoc.disorder = req.item.disorder;
       updateDoc.sex = req.item.sex;
       updateDoc.age = req.item.age;
       updateDoc.str = req.item.str;
       updateDoc.con = req.item.con;
       updateDoc.siz = req.item.siz;
       updateDoc.dex = req.item.dex;
       updateDoc.app = req.item.app;
       updateDoc.san = req.item.san;
       updateDoc.int = req.item.int;
       updateDoc.pow = req.item.pow;
       updateDoc.edu = req.item.edu;
       updateDoc.idea = req.item.idea;
       updateDoc.luck = req.item.luck;
       updateDoc.knowledge = req.item.knowledge;
       updateDoc.maxSanity = req.item.maxSanity;
       updateDoc.damageBonus = req.item.damageBonus;
       updateDoc.sanity = req.item.sanity;
       updateDoc.mp = req.item.mp;
       updateDoc.hp = req.item.hp;
       updateDoc.memo = req.item.memo;
       updateDoc.save();
     });
     socket.emit('update');
     socket.broadcast.emit('update');
   });

   socket.on('items update', function() {
     doc.find(function(err,docs) {
       socket.emit('items open', docs);
     }).sort({'_id': 1});
   });

   socket.on('item delete', function(req) {
     console.log("itemdelete");
     var deleteDoc = new doc();
     doc.findOne({_id : req}, function(err, deleteDoc) {
       if(err || deleteDoc == null){
         return;
       }
       deleteDoc.remove();
     });
   });

};
