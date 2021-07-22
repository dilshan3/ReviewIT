const mongoose = require('mongoose');

const Review = mongoose.model('Review', {
    movie: { type: String },
    reviewer: { type: String },
    content: { type: String },
    sentiment: { type: String },
    polarity: { type: Number },
    addedDate: { type: Date },
    lastUpdate: { type: Date },
    posterUrl: { type: String }
}, 'Reviews');

module.exports = { Review };