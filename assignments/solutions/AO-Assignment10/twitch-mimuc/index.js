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
const jimp = require('jimp');

app.use('/anchor', express.static('anchor'));
app.use('/viewer', express.static('viewer'));

// Use express app as server
const wss = new WebSocket.Server({server: server, path: "/wss"});

wss.on('connection', async function(socket){
  // Preload watermark
  const watermark = await jimp.read('images/mmn.png');
  watermark.scale(0.5);

  socket.on('message', function (message) {
    message = JSON.parse(message);
    if (message.hasOwnProperty('room') && message.hasOwnProperty('data') && message.room === 'streaming') {
      setTimeout(async () => {
        const image = await jimp.read(Buffer.from(message.data.image.replace(/^data:image\/png;base64,/, ""), 'base64'));
        image.blit(watermark, 0, image.bitmap.height - watermark.bitmap.height).getBase64(jimp.AUTO, (err, imgData) => {
          const viewing = JSON.stringify({
            room: 'viewing',
            data: {
              image: imgData,
              audio: message.data.audio
            }
          });
          wss.clients.forEach(function each(client) {
            if (client !== wss && client.readyState === WebSocket.OPEN) {
              client.send(viewing);
            }
          });
        });
      }, 30 * 1000); // 30s
    }
  });
});

server.listen(port, function(){
  console.log('listening on *:' + port);
});