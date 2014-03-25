var express = require("express");
var app = express();
var port = 3700;
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

var routes = require("./routes");

app.get("/", routes.index);

app.listen(port);

var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function(socket) {
  socket.emit('message', { message: 'Welcome to Just Chat' });
  socket.on('send', function(data) {
    io.sockets.emit('message', data);
  })
})
console.log("Listening on port " + port);