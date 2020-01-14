var app = require('express')();
var logger = require('morgan');

app.use(logger('dev'))

// from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
const makeid = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const name = makeid(10);

app.get('/', function(req, res){
  res.json({'hello': 'world', "name": name})
});

app.listen(3000, '0.0.0.0');
console.log('running on http://0.0.0.0:3000')
