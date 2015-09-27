//おまじない
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//

app.get('/', function(req, res) {
  res.render('login');
});

app.post('/index', function(req, res) {
  console.log(req.body);
  if(req.body.button === "login") {
    res.render('index');
  }
});

/**
 * コンソール
 */
io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

/**
 * チャット
 */

 var userlist = new Array();

io.on('connection', function(socket) {
    userlist[socket.id] = req.body.username;
    console.log(userLiset);
    io.emit('chat message', 'login: ' + userlist[socket.id]);
  socket.on('disconnect', function() {
    io.emit('chat message', 'logout: ' + userlist[socket.id]);
    if(!(typeof userlist[socket.id] === "undefined")) {
      delete userlist[socket.id];
    }
  });
  socket.on('chat message', function(msg) {
    io.emit('chat message', userlist[socket.id] + '> ' + msg);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
