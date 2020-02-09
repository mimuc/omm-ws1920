var fs = require('fs');
var app = require('express')();
var https = require('https').createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app);
var io = require('socket.io')(https);
var port = 3000;

app.get('/anchor', function(req, res) {
  res.sendFile(__dirname + '/anchor.html');
});
app.get('/viewer', function(req, res) {
  res.sendFile(__dirname + '/viewer.html');
});

io.on('connection', function(socket) {
  socket.on('streaming', function(image) {
    io.emit('viewing', image);
  });

  socket.on('radio', function(sound) {
    io.emit('voice', sound);
  });
});

https.listen(port, function() {
  console.log('listening on *:' + port);
});
