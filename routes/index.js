const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const jobRouter = require("./job");
const { authMiddleware } = require("../middleware");

console.log("Hitting at routes/index.js");

router.route("/").get((req, res) => {
  res.render("landing");
});

router.use("/auth", authRouter);
router.use("/jobs", authMiddleware, jobRouter);

module.exports = router;
