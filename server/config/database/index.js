const mongoose = require('mongoose');
//Set up default mongoose connection

async function connect () {

    try {
        await mongoose.connect('mongodb://127.0.0.1/MEAN_app', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Connect database successful!');
    } catch (error) {
        console.log('Connect database failure!');
    }

}

module.exports = { connect };

