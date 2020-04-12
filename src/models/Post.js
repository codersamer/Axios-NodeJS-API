const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : { type : String,  default : 'Untitled' },
    userId : {type : String, default : 1},
    content : {type : String, required : true},
    thumbnail : {type : String, default : 'default_thumbnail.jpg'},
    createdAt : {type : Date, default : Date.now}
});

module.exports = mongoose.model('Post', postSchema);