// config/passport.js

const passport = require("passport");
const session = require("express-session");
const User = require("../models/User"); // Assuming you have a 'User' model defined in models/User.js
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

module.exports = {
  configurePassport: function configurePassport(app) {
    app.use(
      session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(User.createStrategy());

    passport.serializeUser(function (user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
      User.findById(id, function (err, user) {
        done(err, user);
      });
    });

    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          // callbackURL: "https://awasar.vercel.app/auth/google/jobly",
          callbackURL: "http://localhost:3000/auth/google/jobly",
          userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        },
        function (accessToken, refreshToken, profile, cb) {
          console.log(profile);
          User.findOrCreate(
            {
              googleId: profile.id,
              username: profile.emails[0].value,
              name: profile.displayName,
            },
            function (err, user) {
              return cb(err, user);
            }
          );
        }
      )
    );
  },
};
