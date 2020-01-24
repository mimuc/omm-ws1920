const fs = require('fs');
const express = require('express');
const app = express();
const https = require('https');
const server = https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app);
const WebSocket = require('ws');
const port = 3000;

app.use('/anchor', express.static('anchor'));
app.use('/viewer', express.static('viewer'));

// Use express app as server
const wss = new WebSocket.Server({server: server, path: "/wss"});

wss.on('connection', function(socket){
  socket.on('message', function(message){
    message = JSON.parse(message);
    if(message.hasOwnProperty('room') && message.hasOwnProperty('data') && message.room === 'streaming') {
      const viewing = JSON.stringify({
        room: 'viewing',
        data: message.data
      });
      wss.clients.forEach(function each(client) {
        if (client !== wss && client.readyState === WebSocket.OPEN) {
          client.send(viewing);
        }
      });
    }
  });
});

server.listen(port, function(){
  console.log('listening on *:' + port);
});