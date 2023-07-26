const express = require("express");
const router = express.Router();
const passport = require("passport");

const { registerUser } = require("../controllers/authController");
const { register } = require("../controllers/viewController");

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router
  .route("/google/jobly")
  .get(
    passport.authenticate("google", { failureRedirect: "/" }),
    function (req, res) {
      res.redirect("/jobs/stats");
    }
  );

router.route("/login").post(
  passport.authenticate("local", {
    successRedirect: "http://localhost:3000/jobs/stats",
    failureRedirect: "/",
    session: true,
  })
);
router.route("/register").get(register).post(registerUser);

module.exports = router;
