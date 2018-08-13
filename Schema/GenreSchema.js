const mongoose = require('mongoose');

const GenreSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

const Genres = mongoose.model('Genres', GenreSchema);

module.exports = Genres;

