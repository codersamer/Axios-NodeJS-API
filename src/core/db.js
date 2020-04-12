const mongoose = require('mongoose');
console.log('Connecting to Database');
mongoose.connect(process.env.DB_URI,{useNewUrlParser : true, useUnifiedTopology: true})
        .then( () => { }, (err) => { console.log(err); });


