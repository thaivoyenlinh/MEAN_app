const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    category_name: { type: String, require: true},
    category_image : { type: String},
});

module.exports = mongoose.model('Category', Category);
