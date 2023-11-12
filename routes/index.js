const express = require("express");
const router = express.Router();
const path = require("path");
const authRouter = require("./auth");
const jobRouter = require("./job");
const { authMiddleware } = require("../middleware");

router.route("/").get((req, res) => {
  res.render("landing");
});

router.use("/auth", authRouter);
router.use("/jobs", authMiddleware, jobRouter);

router.all("*", (req, res) => {
  const absolutePath = path.join(__dirname, "..", "public", "404.html");
  res.status(200).sendFile(absolutePath);
});

module.exports = router;
