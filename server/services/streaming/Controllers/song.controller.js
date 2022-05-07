require('dotenv').config({ path: '../../../env' })
const Song = require("../../../models/Song");
const Lyrics = require("../../../models/Lyrics");
const LikedSongs = require("../../../models/LikedSongs");
const mongoose = require("mongoose");

// Init GridFS bucket
const conn = mongoose.connection;
conn.openUri(process.env.MONGODB_URL)
let bucket;
conn.once('open', () => {
    // Init stream
    bucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "songsFiles"
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
        const lyricsId = new mongoose.Types.ObjectId(song.lyrics);
        const lyrics = await Lyrics.findById({_id: lyricsId});
        const fileId = new mongoose.Types.ObjectId(song.content);
        const imageId = new mongoose.Types.ObjectId(song.image);
        if (!song || !fileId || !imageId || !lyrics) {
            return res.status(404).json({
                Message: 'Song not found'
            })
        }
        await song.remove();
        await lyrics.remove();
        bucket.delete(fileId)
        bucket.delete(imageId)
        res.status(200).json({
            Message: 'Song deleted',
            Song: song
        })
    },
    // GET all the songs in the songs collection
    getAllSongs : async (req, res) => {
        await Song.find().limit(100)
        .then(data => {
          res.send({song : data});
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving songs."
          });
        });
    },
    getUserSongs : async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    const songs = await Song.find({artists : [userId]});
    if (!songs) {
        return res.status(404).json({
            success: false,
            message: 'User have no songs yet'
        });
    }
    res.status(200).json({
        success: true,
        NbrSongs: songs.length,
        Songs : songs
    });
},
    // GET all the files ( images and tracks)
    getAllFiles : async (req, res) => {
        await bucket.find().limit(100).toArray((err, files) => {
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
        if (!req.params.title){
            return res.status(200).json({
                success: false,
                message: 'No Songs available'
            });
        }
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
            return res.status(404).json({
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
        if (song){
            const trackId = new mongoose.Types.ObjectId(song.content);
            bucket.openDownloadStream(trackId).pipe(res);
        }else {
            return res.status(404).json({
                success: false,
                message: 'Song Not Found'
            });
        }

    },
    // Get image by song id
    getSongImage : async (req, res) => {
        const song = await Song.findById(req.params.id)
        if (song){
            const imageId = new mongoose.Types.ObjectId(song.image);
            bucket.openDownloadStream(imageId).pipe(res);
        }else {
            return res.status(404).json({
                success: false,
                message: 'Song Not Found'
            });
        }
    },
    likeSong: async (req, res) => {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({
                success: false,
                message: 'Song Not Found'
            });
        }
        const liked = await LikedSongs.find({user_id: req.body.user})
        for (const likedElement of liked) {
            const songId = new mongoose.Types.ObjectId(likedElement.song_id);
            if (songId.toString() === song._id.toString()){
                return res.status(200).json({
                    success: true,
                    message: 'song already liked',
                    Song: song.title,
                });
            }
        }
        song.nbrLikes += 1;
        await song.save();
        let likedSong = new LikedSongs({
            user_id: req.body.user ,
            song_id: req.params.id
        })
        await likedSong.save();
        res.status(200).json({
            success: true,
            message: 'like added',
            Song: song.title,
            Likes: song.nbrLikes
        });
    },
    dislikeSong: async (req, res) => {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({
                success: false,
                message: 'Song Not Found'
            });
        }
        const likedSongs = await LikedSongs.find({user_id: req.body.user})
        for (const likedSong of likedSongs) {
            const songId = new mongoose.Types.ObjectId(likedSong.song_id);
            if (songId.toString() === song._id.toString()){
                const liked = await LikedSongs.findById(likedSong._id)
                liked.remove();
                song.nbrLikes -= 1;
                await song.save();
                return res.status(200).json({
                    success: true,
                    message: 'dislike added',
                    Song: song.title,
                    Likes: song.nbrLikes
                });
            }
        }
        res.status(200).json({
            success: true,
            message: 'Song not liked',
            Song: song.title,
            Likes: song.nbrLikes
        });

    },
    getSongLyrics: async (req, res) => {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({
                success: false,
                message: 'Song Not Found'
            });
        }
        const lyrics = await Lyrics.findById(song.lyrics)
        if (!lyrics) {
            return res.status(404).json({
                success: false,
                message: 'This Song does not have any lyrics'
            });
        }
        res.status(200).json({
            success: true,
            Song: song.title,
            Lyrics: lyrics
        });
    },
    getLikedSongs: async (req, res) => {
        const likedSongs = await LikedSongs.find({user_id: req.params.id});
        if (!likedSongs) {
            return res.status(404).json({
                success: false,
                message: 'No liked songs found'
            });
        }
        let songs=[];
        for (const likedSong of likedSongs) {
            songs.push(await Song.findById(likedSong.song_id))
        }
        res.status(200).json({
            success: true,
            LikedSongsInfos: likedSongs,
            LikedSongs: songs
        });
    },
    getIsLiked: async (req,res) => {
        const likedSongs = await LikedSongs.find({user_id: req.params.id});
        const song = await Song.findById(req.params.songId);
        for (const likedSong of likedSongs) {
        	if (likedSong.song_id.toString() === song._id.toString()){
                return res.status(200).json({
                    success: true,
                    isLiked: true,
                });
        	}
        }
        res.status(200).json({
            success: true,
            isLiked: false,
        });

    },
    playSong: async (req, res) => {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({
                success: false,
                message: 'Song Not Found'
            });
        }
        song.nbrListens += 1;
        await song.save();
        res.status(200).json({
            success: true,
            message: 'Song is playing ',
            Song: song.title,
            nbrListens: song.nbrListens
        });
    },
}
