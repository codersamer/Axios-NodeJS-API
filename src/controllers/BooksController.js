const Book = require('../models/Book');

module.exports = class BooksController {

    static Index = (request, response, next) => {
        let dataLimit = 0;
        if(request.query.limit) { dataLimit = parseInt(request.query.limit) || 0; }
        Book.GetLimited(dataLimit).then(books => {
            response.json({ error : null, ...books});
        }).catch((error) => { response.status(500).json({error : error.message, data : []});});
    }

    static Show = (request, response, next) => {
        const id = parseInt(request.params.bookId);
        Book.GetById(id).then(results => {
            response.json({ error : null, ...results});
        }).catch(errors => response.status(404).json({error : error.message, data : []}));
    }

}