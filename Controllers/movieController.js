const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var Movie = require('../Models/movie');

// Get all movies
// localhost:3000/movies/
router.get('/', (req, res) => {
    Movie.find((err, docs) => {
        if (!err) { res.send(docs); } else { console.log('Error in retrieving movies' + JSON.stringify(err, undefined, 2)); }
    });
});

// Get a movie by id
// localhost:3000/movies/name
router.get('/:id', (req, res) => {
    Movie.findById(req.params.id, (err, docs) => {
        if (!err) { res.send(docs); } else { return res.status(400).send(`No record with given id:  ${ req.params.id }`); }
    });
});

// Add a new movie
// localhost:3000/movies/
router.post('/', (req, res) => {
    var movie = new Movie({
        title: req.body.title,
        year: req.body.year,
        runtime: req.body.runtime,
        genre: req.body.genre,
        director: req.body.director,
        cast: req.body.cast,
        plot: req.body.plot,
        posterUrl: req.body.posterUrl,
        imdbRating: req.body.imdbRating
    });

    if (Movie.find(movie.name))
        res.send

    movie.save((err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in adding a movie: ' + +JSON.stringify(err, undefined, 2)) }
    });
});

// Update a movie
// localhost:3000/movies/
router.put('/:id', (req, res) => {
    if (!ObjectId.IsValid(req.params.id))
        return res.status(400).send(`No record with given id: ${req.params.id}`)

    var movie = new Movie({
        title: req.body.title,
        year: req.body.year,
        runtime: req.body.runtime,
        genre: req.body.genre,
        director: req.body.director,
        cast: req.body.cast,
        plot: req.body.plot,
        posterUrl: req.body.posterUrl,
        imdbRating: req.body.imdbRating,
        isReviewed: true
    });
    movie.save((err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in adding a movie: ' + +JSON.stringify(err, undefined, 2)) }
    });
});

module.exports = router;