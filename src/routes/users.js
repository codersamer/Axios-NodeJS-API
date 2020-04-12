const Router = require('express').Router();
const UsersController = require('./../controllers/UsersController');
const Auth = require('./../middlewares/Auth');


Router.get('/', UsersController.Index);
Router.post('/register', UsersController.Create);
Router.post('/login', UsersController.Login);


module.exports = {
    route : '/users',
    router : Router
}