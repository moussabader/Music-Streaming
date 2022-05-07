import mongoose from 'mongoose';

const { Schema } = mongoose;


const albumSchema = new Schema({
    title: {type: String, required: [true, "can't be blank"]},
    artists: [Schema.Types.ObjectId],
    songs: [Schema.Types.ObjectId],
    image: String,
    nbrListens: int,
        
});


  module.exports = mongoose.model("Album", albumSchema);