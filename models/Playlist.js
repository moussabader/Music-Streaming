const mongoose = require('mongoose');
const { Schema } = mongoose;

const playlistSchema = new Schema({
    title: {type: String, required: [true, "can't be blank"]},
    user: Schema.Types.ObjectId,
    songs: [Schema.Types.ObjectId],
    scope: {
        type: String,
        enum: ['PRIVATE', 'PUBLIC','FRIENDS_ONLY'],
        default: 'PRIVATE'
    }
});

module.exports = mongoose.model("Playlist", playlistSchema);
