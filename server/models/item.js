const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema({
    item_name: { type: String, require: true},
    item_price: { type: String},
    item_category: { type: String},
    item_type: { type: String},
    item_discription: { type: String},
    item_image: [],
}, {
    timestamps: true,
}
);

module.exports = mongoose.model('Item', Item );