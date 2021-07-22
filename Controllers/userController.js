const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const jwtHelper = require('../Config/jwtHelper');

var router = express.Router();

var User = mongoose.model('User');

router.post('/register', (req, res, next) => {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if (err.name === 'ValidationError') {
                var valErrors = [];
                Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
                res.status(422).send(valErrors)
            } else {
                res.status(422).send(['Duplicate email address found.']);
            }

        }
    });
});

router.post('/authenticate', (req, res, next) => {
    // Password authentication call
    passport.authenticate('local', (err, user, info) => {
        // When an error is returned from callback
        if (err) res.status(400).json(err);
        // Successful authentication
        else if (user) res.status(200).json({ 'token': user.generateJwt() });
        // Unknown user or incorrect password
        else return res.status(404).json(info);
    })(req, res);
})

// Protected route
router.get('/profile', jwtHelper.verifyJwtToken, (req, res, next) => {
    User.findOne({ _id: req._id },
        (err, user) => {
            if (!user)
                res.status(404).json({ status: false, message: 'User record not found.' });
            else
                res.status(200).json({ status: true, user: _.pick(user, ['email', 'name']) });
        }
    )
});

module.exports = router;