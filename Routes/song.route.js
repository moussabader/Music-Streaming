const express = require('express');
const router = express.Router();
const SongController = require('../Controllers/song.controller')
const Song = require("../models/Song");
const upload = require('../Controllers/GridFs')

// POST Song
router.post('/post',upload.fields([{name: 'song'}, {name:'image'}]),async (req, res) => {
    let newSong = new Song({
        title: req.body.title,
        duration: (((req.files['song'][0].size / 1000) * 8) / 320) / 60,
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


module.exports = router;
