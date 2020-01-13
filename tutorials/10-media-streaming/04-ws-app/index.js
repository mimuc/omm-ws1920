var fs = require('fs');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('from-client', function(msg){
    io.emit('from-server', msg + ', again');
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});