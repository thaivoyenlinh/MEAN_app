const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        user_id: {type: String},
        item_id: [],
        quatity_item: [],
        total_price: {type: String}
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Order', Order);
