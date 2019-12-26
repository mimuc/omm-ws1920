var fetch = require('node-fetch');

class DataStorage {

    // the server's "database"
    playlists = {
        1:    {
            id: 1,
            name: "My Cool Playlist",
            songs: [
                1440817260,1350457768,1211829300,1132801552,487215156,1440489651
            ]
        }
    }
    songs = {
        1440817260: {
            artist: "John Lennon",
            title: "Instant Karma"
        },
        1350457768: {
            artist: "Caamp",
            title: "26"
        },
        1211829300: {
            artist: "Dispatch",
            title: "Be Gone"
        },
        1132801552: {
            artist: "Ledinsky",
            title: "DonaldTrumpMakesMeWannaSmokeSomeCrack"
        },
        487215156: {
            artist: "3OH!3",
            title: "Set You Free"
        },
        1440489651: {
            artist: "Creedence Clearwater Revival",
            title: "Lodi"
        }

    }

    // returns ids of all playlists
    getAllPlaylists(){
        return this.playlists.keys()
    }

    // returns playlist metadata (no songs)
    getPlaylistById(id){
        let playlist = this.playlists[id]
        return {
            id: playlist.id,
            name: playlist.name
        }

    }

    // return song ids
    getSongsOfPlaylist(id){
        let playlist = this.playlists[id]
        return playlist.songs
    }

    // return song metadata
    getSongDetail(id){
       let song = this.songs[id]
        return {
            id: id,
            artist: song.artist,
            title: song.title
        }
    }

    getSongContent(id){
        // TODO get the audio content (or something comparable...)
    }

    // if exists replace current song if true, add it another time otherwise
    // returns true if something was created
    addSongToPlaylist(playlistId, trackId, replace){
        if (replace || !(trackId in this.playlists[playlistId].songs)){
            this.playlists[playlistId].songs.push(trackId)

            fetch(`https://itunes.apple.com/lookup?id=${trackId}`).then(json => json.json().then(res => {
                this.songs[trackId] = {
                    artist: res.results[0].artistName,
                    title: res.results[0].trackName
                }
            }))

            return true
        }
        return false;
    }

    deleteSongFromPlaylist(playlistId, trackId){
        let i = this.playlists[playlistId].songs.indexOf(parseInt(trackId))
        if (i > -1) {
            this.playlists[playlistId].songs.splice(i, 1)
        }
    }

}
module.exports = DataStorage;