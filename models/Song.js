const mongoose = require('mongoose');
const  Schema  = mongoose.Schema;


const songSchema = new Schema({
    title: {type: String, required: true},
    duration: Number,
    content: String,
    genre: [String],
    artists: [Schema.Types.ObjectId],
    image: String,
    nbrListens: Number,
    nbrLikes: Number

});
module.exports = mongoose.model("Song", songSchema);
