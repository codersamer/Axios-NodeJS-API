const Router = require('express').Router();
const MessageController = require('./../controllers/MessagesController');

Router.get('/', MessageController.Index);
Router.get('/:messageId', MessageController.Show);
Router.post('/', MessageController.Create);

module.exports = {
    route : '/messages',
    router : Router
};  