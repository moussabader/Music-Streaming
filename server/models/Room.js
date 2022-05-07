import mongoose from 'mongoose';

const { Schema } = mongoose;


const roomSchema = new Schema({
    title: {type: String, required: [true, "can't be blank"]},
    owner: Schema.Types.ObjectId,
    users: [Schema.Types.ObjectId],
    isPublic: {type: Boolean, default: false},
    isLocked: {type: Boolean, default: true},
    password: String,
    activity: {
        type: String,
        enum: ['LISTENING', 'PLAYING','SINGING'],
        default: 'LISTENING'
    }
        
});


  module.exports = mongoose.model("Room", roomSchema);