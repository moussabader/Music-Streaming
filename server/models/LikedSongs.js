const mongoose = require('mongoose')

const { Schema } = mongoose;


const likedSongsSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    song_id: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model("likedSongs", likedSongsSchema);
