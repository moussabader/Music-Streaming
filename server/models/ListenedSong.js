const mongoose = require('mongoose')

const { Schema } = mongoose;


const listenedSongSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    song_id: {
        type: String,
        required: true,
    },
    listen_count:{ 
        type: Number,
        integer: true,
        required: true,
    }
        
});

module.exports = mongoose.model("listenedSong", listenedSongSchema);