var express = require('express');
var router = express.Router();

var fetch = require('node-fetch');

router.get('/', function(req, res, next) {
  let searchQuery = req.query.term;
  fetch(`https://itunes.apple.com/search?term=${searchQuery}`).then(json => json.json().then(itunesRes => {
    let resultArray = []
    itunesRes.results.forEach(result => {
      resultArray.push({
        artist: result.artistName,
        title: result.trackName,
        id: result.trackId
      })
    })
    res.send(resultArray)
  }))
});

module.exports = router;
