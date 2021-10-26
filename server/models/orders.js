const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema(
    {
        user_id: {type: ObjectId},
        item_id: {type: ObjectId},
        order_price: {type: Number}
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Other', Order);
