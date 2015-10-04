"use strict";

exports.index = function(req, res){
  var params = {
    title: 'TrpgTool'
  }
  res.render('index', params);
};
