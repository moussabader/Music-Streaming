const mongoose = require('mongoose');
const  Schema  = mongoose.Schema;

const adSchema = new Schema({
    name: {type: String, required: true},
    content: Schema.Types.ObjectId,
    image: Schema.Types.ObjectId,
});

module.exports = mongoose.model("Ad", adSchema);
