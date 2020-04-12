const User = require('./../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = class UsersController {

    static Index  = (request, response) => {
        User.find((error, users) => {
            if(error) {
                response.status(500).json({ error : 'Internal Server Error', data : [] });
                return;
            }
            //Remove Passwords
            users = users.map((user, index) => { user.password = undefined; return user;})
            response.json({error : null , data : users});
        });
    } 

    static Create = (request, response, next) => {
        if(!request.body.email || !request.body.password)
        { response.json({error : 'Please Fill atleast email and password', data : []}); return; }
        //Hash Passwords
        bcrypt.hash(request.body.password, 10, (error, hashedPassowrd) => {
            if(error) { response.status(500).json({ error : 'Please use a better password', data : []});}
            else {
                const user = new User(request.body);
                user.password = hashedPassowrd
                user.save((error, user) => {
                    if(error) { response.status(500).json({ error : error.message, data : []}); }
                    else 
                    { 
                        user.password = undefined;
                        response.json({ error : null, message : 'User Registered Successfully', data : [user] }); 
                    }
                });
            }
        });
    }

    static Login = (request, response, next) => {
        if(!request.body.email || !request.body.password)
        { response.status(401).json({error : 'Please Fill email and password', data : []}); return; }
        User.findOne({email : request.body.email}, (error, user) => {
            if(error) { response.status(401).json({error : 'Invalid Email or Password', data : []}); return; }
            bcrypt.compare(request.body.password, user.password, (error, success) => {
                if(error || !success) {response.status(401).json({error : 'Invalid Email or Password', data : []}); return;}
                const token = jwt.sign({id : user._id, email : user.email }, process.env.JWT_SECRET);
                response.json({
                    error : null,
                    message : 'You logged in successfully',
                    data : { token }
                });
            })
        });
    }
}