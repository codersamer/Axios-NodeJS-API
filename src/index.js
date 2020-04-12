console.log('Starting API');

//Configurations
console.log('Loading Configurations');
require('dotenv').config();
console.log('Configurations Loaded');

//Server
console.log('Loading Server Login');
const app = require('./core/server');
const db = require('mongoose');
console.log('Server Loaded');
//Handle Connection
db.connection.on('open', () => {
    console.log('Database connected successfully');
    console.log(`Start Listening on Port ${process.env.SERVER_PORT}`);
    app.listen(parseInt(process.env.SERVER_PORT));
})

//Database
console.log('Loading Database Logic');
require('./core/db');
console.log('Database Loaded');
