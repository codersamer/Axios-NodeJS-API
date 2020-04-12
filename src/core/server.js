const express = require('express');

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

//Initialize Server
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
//Load Middlewares
console.log('Starting Middlewares Loading');
fs.readdir(__dirname+'/../middlewares/', (errors, results) => {
    if(errors){console.log(errors);return;}
    results.forEach(fileName =>{
        const fullName = `${__dirname}/../middlewares/${fileName}`;
        if(path.extname(fullName) != '.js'){return;}
        const middlwareElement = require(fullName);
        if(middlwareElement.route && middlwareElement.middleware)
        {
            console.log(`Milldeware ${fileName} Auto Injected on ${middlwareElement.route} Route`);
            app.use(middlwareElement.route, middlwareElement.middleware);
        }
    });
    console.log('Middlwares Loaded Successfuly');
});

//Load Routes
console.log('Starting Routes Loading');
fs.readdir(__dirname+'/../routes/', (errors, results) => {
    if(errors){console.log(errors);return;}
    results.forEach(fileName =>{
        const fullName = `${__dirname}/../routes/${fileName}`;
        if(path.extname(fullName) != '.js'){return;}
        const routingElement = require(fullName);
        if(routingElement.route && routingElement.router)
        {app.use('/api'+routingElement.route.trim('/'), routingElement.router);}
    });
    console.log('Routes Loaded Successfuly');
});

console.log('Assign Public Root');
app.use(express.static('public'));

module.exports = app;