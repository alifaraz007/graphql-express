const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: String,
    genre: String,
    authorId: String
});

const book = mongoose.model('Book', bookSchema);
module.exports = book;