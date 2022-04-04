const express = require('express');
const router = express.Router();
const SongController = require('../Controllers/song.controller')
const Song = require("../models/Song");
const upload = require('../Controllers/SongStorage')

// POST Song
router.post('/post',upload.fields([{name: 'song'}, {name:'image'}]),async (req, res) => {
    let newSong = new Song({
        title: req.body.title,
        // 192kbps (bitrate) * duration in seconds = size in kilobits of data / 8 = size in kilobytes * 1024 = size in bytes => reverse this
        duration: (((req.files['song'][0].size / 1024) * 8) / 192) / 60,
        content: req.files['song'][0].id,
        genre: req.body.genre,
        artists: [],
        image: req.files['image'][0].id,
        nbrListens: 0,
        nbrLikes: 0
    });
    await newSong.save();
    res.status(200).json({
        message: "Song Uploaded",
        Song: newSong,
        Files: req.files
    });
});

router.put('/update/:id', SongController.updateSong);
router.delete('/delete/:id',SongController.deleteSong);
router.get('/get-songs',SongController.getAllSongs);
router.get('/get-files',SongController.getAllFiles);
router.get('/get-tracks',SongController.getAllTracks);
router.get('/get-songs/:title',SongController.getSongsByTitle);
router.get('/get-file/:filename',SongController.getFileByName);
router.get('/get-song/:id',SongController.getOneSong);
router.get('/get-track/:id',SongController.getSongTrack);
router.get('/get-image/:id',SongController.getSongImage);
router.put('/like-song/:id',SongController.likeSong);
router.put('/dislike-song/:id',SongController.dislikeSong);


module.exports = router;
