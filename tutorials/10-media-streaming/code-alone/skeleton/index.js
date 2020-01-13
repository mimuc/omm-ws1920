var fs = require('fs');
var app = require('express')();
var https = require('https').createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app);
var io = require('socket.io')(https);
var port = 3000;

app.get('/anchor', function(req, res){
  res.sendFile(__dirname + '/anchor.html');
});
app.get('/viewer', function(req, res){
  res.sendFile(__dirname + '/viewer.html');
});

io.on('connection', function(socket){
  // TODO: implement listen on 'streaming' for an image
  //       and send the received image to 'viewing' channel
});

https.listen(port, function(){
  console.log('listening on *:' + port);
});