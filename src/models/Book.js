const fs = require('fs');

class Book {

    static GetDataDirectory(){return `${__dirname}/../data/`;}

    static GetAll()
    {
        return new Promise((resolve, reject) => {
            fs.readFile(this.GetDataDirectory()+'books.json', (errors, data) => {
                if(errors){ reject(errors); }
                resolve(JSON.parse(data.toString()));
            });
        });
    }

    static GetLimited(limit)
    {
        return new Promise((resolve, reject) => {
            this.GetAll().then((books) => {
                resolve(limit == 0 ? books : {data : books.data.slice(0,limit)});
            }).catch((errors) => {reject(errors);})
        })
    }

    static GetById(id)
    {
        return new Promise((resolve, reject) => {
            this.GetAll().then((books) => {
                const book = books.data.find(element => element.id == id);
                if(book === undefined) {reject("Cant find selected book");}
                resolve({data : [book]});
            }).catch(errors => reject(errors));
        })
    }
}

module.exports = Book;