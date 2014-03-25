var express = require("express");
var app = express();
var port = 3700;
var path = require('path');
var http = require('http');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

var routes = require("./routes");

app.get("/", routes.index);

var server = http.createServer(app)
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
  socket.emit('message', { message: 'Welcome to Just Chat' });
  socket.on('send', function(data) {
    io.sockets.emit('message', data);
  })
})

server.listen(port)
console.log("Listening on port " + port);