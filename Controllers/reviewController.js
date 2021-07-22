const express = require('express');
var router = express.Router();

const _ = require('lodash');
const jwtHelper = require('../Config/jwtHelper');

var ObjectId = require('mongodb').ObjectID;

var { Review } = require('../Models/review');

// Get all reviews
// localhost:3000/reviews/
router.get('/', jwtHelper.verifyJwtToken, (req, res) => {
    Review.find((err, docs) => {
        if (!err) {
            res.status(200).json({ 'reviews': docs });
        } else { console.log('Error in retrieving reviews' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', jwtHelper.verifyJwtToken, (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        res.status(400).send('No record with given id: ${req.params.id}')
    Review.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.status(200).json({ 'review': doc });
        } else { console.log('Error in retrieving review' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', jwtHelper.verifyJwtToken, (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        res.status(400).send('No record with given id: ${req.params.id}')

    var review = {
        movie: req.body.movie,
        reviewer: req.body.reviewer,
        content: req.body.content,
        sentiment: req.body.sentiment,
        polarity: req.body.polarity,
        addedDate: req.body.addedDate,
        lastUpdate: new Date,
        posterUrl: req.body.posterUrl
    };
    Review.findByIdAndUpdate(req.params.id, { $set: review }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else { console.log('Error in updating review' + JSON.stringify(err, undefined, 2)); }
    })
})

router.delete('/:id', jwtHelper.verifyJwtToken, (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        res.status(400).send('No record with given id: ${req.params.id}')
    Review.findByIdAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else { console.log('Error in deleting reviews' + JSON.stringify(err, undefined, 2)); }
    });
})

// Add a new review
// localhost:300/reviews/
router.post('/', jwtHelper.verifyJwtToken, (req, res) => {
    var review = new Review({
        movie: req.body.movie,
        reviewer: req.body.reviewer,
        content: req.body.content,
        sentiment: req.body.sentiment,
        polarity: req.body.polarity,
        addedDate: req.body.addedDate,
        lastUpdate: new Date,
        posterUrl: req.body.posterUrl
    });
    review.save((err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in adding a review: ' + +JSON.stringify(err, undefined, 2)) }
    });
});

module.exports = router;