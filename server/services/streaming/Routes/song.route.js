const express = require('express');
const router = express.Router();
const SongController = require('../Controllers/song.controller')
const Song = require("../../../models/Song");
const Lyrics = require("../../../models/Lyrics");
const upload = require('../Controllers/SongStorage')

// POST Song
router.post('/post',upload.fields([{name: 'song'}, {name:'image'}]),async (req, res) => {
    if (req.files){
        let newSong = new Song({
            title: req.body.title,
            // 192kbps (bitrate) * duration in seconds = size in kilobits of data / 8 = size in kilobytes * 1024 = size in bytes => reverse this
            duration: Math.round((((((req.files['song'][0].size / 1024) * 8) / 192) / 60) + Number.EPSILON) * 100 ) / 100,
            content: req.files['song'][0].id,
            genre: req.body.genre,
            release: req.body.release,
            artists: [req.body.artists],
            image: req.files['image'][0].id,
            nbrListens: 0,
            nbrLikes: 0
        });
        await newSong.save();
        let newLyrics = new Lyrics({
            lyrics : req.body.lyrics,
            song : newSong._id
        })
        await newLyrics.save();
        await newSong.set({
            lyrics : newLyrics._id
        })
        await newSong.save();
        res.status(200).json({
            message: "Song Uploaded",
            Song: newSong,
            Files: req.files
        });
    }else {
        res.status(500).json({
            message: "Song Failed To Upload",
            Files: req.files
        });
    }
});

router.put('/update/:id', SongController.updateSong);
router.delete('/delete/:id',SongController.deleteSong);
router.get('/get-songs',SongController.getAllSongs);
router.get('/get-user-songs/:userId',SongController.getUserSongs);
router.get('/get-files',SongController.getAllFiles);
router.get('/get-tracks',SongController.getAllTracks);
router.get('/get-songs/:title',SongController.getSongsByTitle);
router.get('/get-file/:filename',SongController.getFileByName);
router.get('/get-song/:id',SongController.getOneSong);
router.get('/get-track/:id',SongController.getSongTrack);
router.get('/get-image/:id',SongController.getSongImage);
router.put('/play-song/:id',SongController.playSong);
router.put('/like-song/:id',SongController.likeSong);
router.put('/dislike-song/:id',SongController.dislikeSong);
router.get('/get-lyrics/:id',SongController.getSongLyrics);
router.get('/get-liked-songs/:id',SongController.getLikedSongs);
router.get('/get-is-liked/:id/:songId',SongController.getIsLiked);

module.exports = router;
