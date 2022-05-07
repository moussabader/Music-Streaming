const express = require('express');
const router = express.Router();
const PlaylistController = require('../Controllers/playlist.controller')

router.post('/post',PlaylistController.create);
router.put('/update/:id',PlaylistController.update);
router.delete('/delete/:id',PlaylistController.delete);
router.put('/add-song/:playlistId',PlaylistController.addSong);
router.put('/remove-song/:playlistId',PlaylistController.removeSong);
router.get('/get-all',PlaylistController.getAll);
router.get('/get-user-playlists/:idUser',PlaylistController.getUserPlaylists);
router.get('/get/:id',PlaylistController.getOne);
router.get('/get-songs/:playlistId',PlaylistController.getPlaylistSongs);
router.put('/like-playlist/:playlistId',PlaylistController.likePlaylist);
router.put('/dislike-playlist/:playlistId',PlaylistController.dislikePlaylist);

module.exports = router;
