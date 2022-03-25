const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Song = require('../models/Song');
const upload = require('../Controllers/GridFs');

// Init GridFS bucket
const conn = mongoose.connection;
let bucket;
conn.once('open', () => {
    // Init stream
    bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });
});

// GET form
// router.get('/', (req, res) => {
//     res.render('form');
// });

// POST Song
// upload.single(field)
// req.file
// upload.array(field)
// req.files[0/1]
// router.post('/post', upload.fields([{name: 'song'}, {name: 'image'}]), async (req, res) => {

    // let newSong = new Song({
    //     title: req.body.title,
    //     duration: (((req.files['song'][0].size / 1000) * 8) / 320) / 60,
    //     content: req.files['song'][0].id,
    //     genre: req.body.genre,
    //     artists: [],
    //     image: req.files['image'][0].id,
    //     nbrListens: 0,
    //     nbrLikes: 0
    // });
    // await newSong.save();
    // res.status(200).json({
    //     message : "Song Uploaded",
    //     Song: newSong,
    //     Files : req.files
    // });
// });

// Update song by id
// router.put('/update/:id', async (req, res) => {
    // const song = await Song.findById(req.params['id']);
    // if (!song) return res.status(404).json({
    //     message: "Song not found"
    // });
    // await song.set(req.body);
    // await song.save();
    // res.status(200).json({
    //     Message: 'Song Updated',
    //     Song: song
    // })
// });

// Delete song and its files by id
// router.delete('/delete/:id', async (req, res) => {
//     const song = await Song.findById({_id: req.params.id});
//     if (!song) {
//         res.status(404).json({
//             Message: 'Song not found'
//         })
//     }
//     const fileId = new mongoose.Types.ObjectId(song.content);
//     const imageId = new mongoose.Types.ObjectId(song.image);
//     await song.remove();
//     bucket.delete(fileId)
//     bucket.delete(imageId)
//     res.status(200).json({
//         Message: 'Song deleted',
//         Song: song
//     })
// });

// GET all the songs in the songs collection
// router.get('/allSongs', async (req, res) => {
//     const songs = await Song.find();
//     if (songs.length === 0) {
//         return res.status(200).json({
//             success: false,
//             message: 'No Songs available'
//         });
//     }
//     res.status(200).json({
//         success: true,
//         SongsCount: songs.length,
//         Songs: songs,
//     });
// });
//GET songs by title
// router.get('/searchByTitle/:title', (req, res) => {
//     Song.find({title: req.params.title},
//         (err, songs) => {
//             if (songs.length === 0) {
//                 return res.status(200).json({
//                     success: false,
//                     message: 'No Songs available'
//                 });
//             }
//             res.status(200).json({
//                 success: true,
//                 songs,
//             });
//         })
// });

// //GET song by id
// router.get('/searchById/:id', async (req, res) => {
//     const song = await Song.findById(req.params.id)
//     if (!song) {
//         return res.status(200).json({
//             success: false,
//             message: 'Song Not Found'
//         });
//     }
//     res.status(200).json({
//         success: true,
//         song,
//     });
// });

// // GET all the tracks in the uploads collection
// router.get('/tracks', (req, res) => {
//     bucket.find().toArray((err, files) => {
//         if (!files || files.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'No files available'
//             });
//         }
//         for (let i = 0; i <files.length ; i++) {
//             if (files[i].contentType === "image/jpeg"){
//                 files.splice(i,1)
//             }
//         }
//         res.status(200).json({
//             success: true,
//             TracksCount: files.length,
//             Tracks : files
//         });
//     });
// });

// // GET all the files in the uploads' collection ( images and tracks)
// router.get('/files', (req, res) => {
//     bucket.find().toArray((err, files) => {
//         if (!files || files.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'No files available'
//             });
//         }
//
//         res.status(200).json({
//             success: true,
//             FilesCount: files.length,
//             Files : files
//         });
//     });
// });

// //GET file by filename
// router.get('/file/:filename', (req, res) => {
//     bucket.find({filename: req.params.filename}).toArray((err, files) => {
//         if (!files[0] || files.length === 0) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'No files available',
//             });
//         }
//         bucket.openDownloadStreamByName(req.params.filename).pipe(res);
//     });
// });

// // Get Track by song id
// router.get('/track/:id', async (req, res) => {
//     const song = await Song.findById(req.params.id)
//     const trackId = new mongoose.Types.ObjectId(song.content);
//     bucket.openDownloadStream(trackId).pipe(res);
// });
// // Get image by song id
// router.get('/image/:id', async (req, res) => {
//     const song = await Song.findById(req.params.id)
//     const imageId = new mongoose.Types.ObjectId(song.image);
//     bucket.openDownloadStream(imageId).pipe(res);
// });


module.exports = router;

