const Router = require('express').Router();
const uploader = require('../core/uploader');
const Auth = require('../middlewares/Auth');
const PostsController = require('./../controllers/PostsController');

Router.get('/:postId', PostsController.Show);
Router.put('/:postId', Auth, PostsController.Update);
Router.post('/', Auth, uploader.single('thumbnail'), PostsController.Create);
Router.delete('/:postId', Auth, PostsController.Delete);
Router.get('/', PostsController.Index);

module.exports = { route : '/posts', router : Router };