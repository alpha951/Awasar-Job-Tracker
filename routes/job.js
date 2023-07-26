const express = require("express");
const router = express.Router();

const {
  addJob,
  editJob,
  deleteJob,
  updateProfile,
} = require("../controllers/jobController");

const {
  stats,
  viewAddJob,
  profile,
  viewEditJob,
  viewAllJobs,
  filteredJobs,
  logOut,
} = require("../controllers/viewController");

router.route("/add-job").post(addJob);
router.route("/edit-job/:_id").post(editJob);
router.route("/delete/:_id").get(deleteJob);

// profile update
router.route("/profile").post(updateProfile);

// router.route("/").get(home);

router.route("/logout").get(logOut);

router.route("/stats").get(stats);
router.route("/all-jobs").get(viewAllJobs).post(filteredJobs);
router.route("/add-job").get(viewAddJob);
router.route("/profile").get(profile);
router.route("/edit/:_id").get(viewEditJob);

module.exports = router;
