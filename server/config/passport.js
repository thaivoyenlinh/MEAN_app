const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("../models/user");
const logger = require("./logger");

const localLogin = new localStrategy(async (username, password, done) => {
  logger.info("localLogin:");
  let user = await User.findOne({ user_name: username });
  if (!user) {
    return done(null, false, { message: "Username is not registered" });
  } else if (!user.verifyPassword(password)) {
    return done(null, false, { message: "Wrong password" });
  } else {
    return done(null, user);
  }
});

passport.use(localLogin);

module.exports = passport;
