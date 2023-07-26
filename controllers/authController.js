const User = require("../models/User");
const passport = require("passport");

// using local strategy with passport

const registerUser = (req, res) => {
  const filled = req.body;
  console.log("body is", filled);
  let newUser = new User({
    username: filled.username,
    name: filled.name,
    number: filled.number,
    location: filled.location,
  });
  User.register(newUser, filled.password, (err, user) => {
    if (err) {
      console.log(err);
      res.render("register");
    }
    passport.authenticate("local")(req, res, () => {
      res.render("stats", {
        pending: 0,
        interview: 0,
        offered: 0,
        onlineAssessment: 0,
        declined: 0,
      });
    });
  });
};

module.exports = {
  registerUser,
};
