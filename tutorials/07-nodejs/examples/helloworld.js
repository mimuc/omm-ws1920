var http = require('http');
var port = 8976;
var host = '127.0.0.1';

var server = http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello World\n');
});

server.listen(port, host);
console.log('Server running at http://'+host+':'+port+'/');