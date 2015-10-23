"use strict";

/**
 * モデル読み込み
 */
var model = require('../model.js');
var User  = model.User;


exports.index = function(req, res) {
  var params = {
    title: 'TrpgTool : Main Page'
  }
  res.render('index', { user: req.session.user});
  console.log(req.session.user);
};

/**
 * ユーザ登録
 */
exports.add = function(req, res){
    var newUser = new User(req.body);
    newUser.save(function(err){
        if(err){
            console.log(err);
            res.redirect('back');
        }else{
            res.redirect('/');
        }
    });
};

exports.login = function(req, res) {
  var params = {
    title: 'TrpgTool : Login Page'
  }
  var userName = req.query.userName;
  var query    = { "userName": userName};

  User.find(query, function(err, data){
    if(err){
      console.log(err);
    }
    if(data == ""){
      res.render('login');
    }else{
      req.session.user = userName;
      res.redirect('/');
    }
  });
};
