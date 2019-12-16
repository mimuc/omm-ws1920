var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  // just a redirect
  res.location('/ipod-ui').status(301).send()
});

module.exports = router;
