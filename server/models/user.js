const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = new Schema(
  {
    user_name: { type: String },
    user_phoneNumber: { type: String },
    user_password: { type: String },
    user_address: { type: String },
    saltSecret: { type: String },
  },
  {
    timestamps: true,
  }
);

User.pre("save", function (next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.user_password, salt, (err, hash) => {
      this.user_password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

//Method
User.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.user_password);
};

User.methods.generateJWT = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

module.exports = mongoose.model("User", User);
