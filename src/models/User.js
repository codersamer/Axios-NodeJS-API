const mongoose = require('mongoose');

const UserShcema = new mongoose.Schema({
    email : {
        type : String,
        trim : true,
        lowercase : true,
        required : true
    },
    name : {
        type : String,
        trim : true,
        default : 'API User'
    },
    password : {
        type : String,
        trim : true,
        required : true,
    }
});

module.exports = mongoose.model('User', UserShcema);