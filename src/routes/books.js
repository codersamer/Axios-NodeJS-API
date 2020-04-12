const Router = require('express').Router();
const BooksController = require('./../controllers/BooksController');

//Select By Id
Router.get('/:bookId', BooksController.Show);
//List All Books
Router.get('/', BooksController.Index);

module.exports = { route : '/books', router : Router };