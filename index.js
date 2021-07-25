require('./Config/config');
require('./db.js');
require('./Models/user');
require('./Config/passportConfig');

const express = require('express');
const cors = require('cors');
const passport = require('passport');
const path = require('path');

var userController = require('./Controllers/userController');
var movieController = require('./Controllers/movieController');
var reviewController = require('./Controllers/reviewController');

var app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

// Global error handler
// app.use((err, req, res, next) => {
//     if (err.name === 'ValidationError') {
//         var valErrors = [];
//         Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
//         res.status(422).send(valErrors)
//     }
// });


app.use(express.static(path.join(__dirname, 'Public')));
app.use('/users', userController);
app.use('/movies', movieController);
app.use('/reviews', reviewController);

app.get("/*", (rew, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})

//Starting server
app.listen(process.env.PORT, "0.0.0.0", () => console.log('Server started at port '));