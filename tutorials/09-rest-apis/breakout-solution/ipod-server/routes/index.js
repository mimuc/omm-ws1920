var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.location('/ipod-ui').status(301).send()
});

module.exports = router;
