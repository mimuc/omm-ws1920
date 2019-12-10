var express = require('express');
var router = express.Router();

let imagesDB = require('./imagedatabase');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(imagesDB);
});

module.exports = router;
