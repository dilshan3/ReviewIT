const mongoose = require('mongoose');

const Movie = mongoose.model('Movie', {
    title: { type: String },
    year: { type: String },
    runtime: { type: String },
    genre: { type: String },
    director: { type: String },
    cast: { type: String },
    plot: { type: String },
    posterUrl: { type: String },
    imdbRating: { type: String },
    isReviewed: { type: Boolean }
}, 'Movies');

module.exports = Movie;