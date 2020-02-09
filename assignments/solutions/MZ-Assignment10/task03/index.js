var fs = require('fs');
var app = require('express')();
var Jimp = require('jimp');

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

io.on('connection', async (socket) => {
  const overlay = await Jimp.read('./mmn.png')

  socket.on('streaming', (image) => {
    // Get rid of mime prepend
    const [meta, data] = image.split(',');
    const buf = Buffer.from(data, 'base64')

    Jimp.read(buf)
      .then(img => img.composite(overlay, 0, 260, { mode: Jimp.BLEND_MULTIPLY }))
      .then(img => img.getBufferAsync(Jimp.MIME_PNG))
      .then(buf => io.emit('viewing', [meta, buf.toString('base64')].join(',')))
  });

});

https.listen(port, function() {
  console.log('listening on *:' + port);
});
