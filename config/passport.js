const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const db = require("../models");

//Use local strategy
passport.use(new LocalStrategy(
  {
    usernameField: "email"
  },
  (email, password, done) => {
    db.User.findOne({
      where: {
        email: email
      }
    }).then( (dbUser) => {
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email."
        });
      }
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      return done(null, dbUser);
    });
  }
));

//serialization
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

module.exports = passport;
