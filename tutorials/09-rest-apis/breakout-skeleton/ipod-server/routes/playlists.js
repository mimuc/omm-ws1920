var express = require('express');
var router = express.Router();

// ... mounts to /playlists/
router.get('/', function(req, res, next) {
  let playlists = req.dataStorage.getPlaylists()
  res.send(playlists)
});

// ... mounts to /playlists/:playlistId
router.get('/:playlistId', function(req, res, next) {
  // get the value of the here so called :playlistId placeholder
  let playlistId = req.params.playlistId;
  // get the playlist metadata from the data storage
  let playlist = req.dataStorage.getPlaylistById(playlistId)

  // send only meta data (no songs), to reduce data traffic
  res.send({
    id: playlist.id,
    name: playlist.name
  })
});

// TODO add other playlists API endpoints here

module.exports = router;
