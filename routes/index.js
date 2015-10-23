"use strict";

exports.index = function(req, res) {
  var params = {
    title: 'TrpgTool : Main Page'
  }
  res.render('index', params);
};

exports.login = function(req, res) {
  var params = {
    title: 'TrpgTool : Login Page'
  }
  res.render('login', params);
};
