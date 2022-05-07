const mongoose = require('mongoose');
const {Schema}  = mongoose;

const lyricsSchema = new Schema({
    lyrics: {type: String},
    song: String,
});
module.exports = mongoose.model("Lyrics", lyricsSchema);
