/*
you don't need to import Passport directly if you only want to use the req.isAuthenticated() method. The req.isAuthenticated() method is added to the req object by Passport when you call app.use(passport.initialize()) and app.use(passport.session()) in your main app.js file.
*/

const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("validating req");

    return next();
  } else {
    console.log("Hitting at auth middleware with failure");
    res.render("landing");
  }
};

module.exports = authMiddleware;
