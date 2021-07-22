const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    (err) => {
        if (!err)
            console.log("MongoDb connected successfully..");
        else
            console.log("Error in DB connection: " + JSON.stringify(err, undefined, 2));
    });

module.exports = mongoose;