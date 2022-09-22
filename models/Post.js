const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
 title: {
    type:String,
    required:true
 },
 desc: {
    type:String,
    required:true
 },
 photo: {
    type:String,
 },
 user: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
 }

});

module.exports = mongoose.model('Post', postSchema);
