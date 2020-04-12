const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 3,
        trim : true
    },
    subject : {
        type : String,
        required : true,
        trim : true
    },
    content : {
        type : String,
        required : true,
        trim : true
    }
});

module.exports = mongoose.model('Message', MessageSchema);