var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  let playlists = req.dataStorage.getPlaylists()
  res.send(playlists)
});

router.get('/:playlistId', function(req, res, next) {
  let playlistId = req.params.playlistId;
  let playlist = req.dataStorage.getPlaylistById(playlistId)

  // send only meta data, to reduce data traffic
  res.send({
    id: playlist.id,
    name: playlist.name
  })
});

router.get('/:playlistId/songs', function(req, res, next) {
  let playlistId = req.params.playlistId;
  let songs = req.dataStorage.getSongsOfPlaylist(playlistId)

  res.send(songs)
});

router.get('/:playlistId/songs/:trackId', function(req, res, next) {
  let trackId = req.params.trackId;
  res.status(301).location(`/songs/${trackId}`).send()
});

router.post('/:playlistId/songs/:trackId', function(req, res, next) {
  let playlistId = req.params.playlistId;
  let trackId = req.params.trackId;
  req.dataStorage.addSongToPlaylist(playlistId, trackId, false)

  res.status(201).send()
});

router.put('/:playlistId/songs/:trackId', function(req, res, next) {
  let playlistId = req.params.playlistId;
  let trackId = req.params.trackId;
  let wasAdded = req.dataStorage.addSongToPlaylist(playlistId, trackId, true)

  res.status(wasAdded ? 201 : 200).send()
});


router.delete('/:playlistId/songs/:trackId', function(req, res, next) {
  let playlistId = req.params.playlistId;
  let trackId = req.params.trackId;
  req.dataStorage.deleteSongFromPlaylist(playlistId, trackId)

  res.status(200).send()
});


module.exports = router;
