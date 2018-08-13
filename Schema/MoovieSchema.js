const mongoose = require('mongoose');

const MoovieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rentalPrice: { type: Number, required: true },
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genres',
        required: true
    }],
    quantity: { type: Number, required: true },
});

const Moovie = mongoose.model('Moovie', MoovieSchema);

module.exports = Moovie;

