const multer = require('multer');

const storage = multer.diskStorage({
    
    destination : (request, file, callback) => {callback(null, 'public/uploads/')},

    filename : (request, file, callback) => { 
        callback(null, new Date().getTime().toString() + '-' +file.originalname)
    }
});

module.exports = multer({storage});