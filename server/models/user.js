const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        user_name: {type: String},
        user_phoneNumber: {type: Number},
        user_address: {type: String}
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', User);
