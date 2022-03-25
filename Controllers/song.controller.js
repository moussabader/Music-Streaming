const Song = require("../models/Song");
const mongoose = require("mongoose");
const Playlist = require("../models/Playlist");

// Init GridFS bucket
const conn = mongoose.connection;
let bucket;
conn.once('open', () => {
    // Init stream
    bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "uploads"
    });
});

module.exports = {
    updateSong: async (req,res) => {
        const song = await Song.findById(req.params['id']);
        if (!song) return res.status(404).json({
            message: "Song not found"
        });
        await song.set(req.body);
        await song.save();
        res.status(200).json({
            Message: 'Song Updated',
            Song: song
        })
    },
    // Delete song and its files by id
    deleteSong : async (req, res) => {
        const song = await Song.findById({_id: req.params.id});
        if (!song) {
            res.status(404).json({
                Message: 'Song not found'
            })
        }
        const fileId = new mongoose.Types.ObjectId(song.content);
        const imageId = new mongoose.Types.ObjectId(song.image);
        await song.remove();
        bucket.delete(fileId)
        bucket.delete(imageId)
        res.status(200).json({
            Message: 'Song deleted',
            Song: song
        })
    },
    // GET all the songs in the songs collection
    getAllSongs : async (req, res) => {
        const songs = await Song.find();
        if (songs.length === 0) {
            return res.status(200).json({
                success: false,
                message: 'No Songs available'
            });
        }
        res.status(200).json({
            success: true,
            SongsFound: songs.length,
            Songs: songs,
        });
    },
    // GET all the files ( images and tracks)
    getAllFiles : async (req, res) => {
        await bucket.find().toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No files available'
                });
            }
            res.status(200).json({
                success: true,
                FilesFound: files.length,
                Files : files
            });
        });
    },
    // GET all the tracks in the uploads collection
    getAllTracks : async (req, res) => {
        await bucket.find().toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No files available'
                });
            }
            for (let i = 0; i <files.length ; i++) {
                if (files[i].contentType === "image/jpeg"){
                    files.splice(i,1)
                }
            }
            res.status(200).json({
                success: true,
                TracksFound: files.length,
                Tracks : files
            });
        });
    },
    //GET songs by title
    getSongsByTitle :  (req, res) => {
         Song.find({title:  {$regex : new RegExp(req.params.title, "i") } },
            (err, songs) => {
                if (songs.length === 0) {
                    return res.status(200).json({
                        success: false,
                        message: 'No Songs available'
                    });
                }
                res.status(200).json({
                    success: true,
                    songs,
                });
            })
    },
    //GET file by filename
    getFileByName : async (req, res) => {
        await bucket.find({filename: req.params.filename}).toArray((err, files) => {
            if (!files[0] || files.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'No files available',
                });
            }
            bucket.openDownloadStreamByName(req.params.filename).pipe(res);
        });
    },
    //GET song by id
    getOneSong : async (req, res) => {
        const song = await Song.findById(req.params.id)
        if (!song) {
            return res.status(200).json({
                success: false,
                message: 'Song Not Found'
            });
        }
        res.status(200).json({
            success: true,
            Song : song
        });
    },
    // Get Track by song id
    getSongTrack : async (req, res) => {
        const song = await Song.findById(req.params.id)
        const trackId = new mongoose.Types.ObjectId(song.content);
        bucket.openDownloadStream(trackId).pipe(res);
    },
    // Get image by song id
    getSongImage : async (req, res) => {
        const song = await Song.findById(req.params.id)
        const imageId = new mongoose.Types.ObjectId(song.image);
        bucket.openDownloadStream(imageId).pipe(res);
    }
}
