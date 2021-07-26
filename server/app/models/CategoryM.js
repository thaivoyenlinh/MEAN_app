const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    name: { Type: String, require: true},
    avatar : { Type: String},
});

module.exports = mongoose.model('Category', Category);