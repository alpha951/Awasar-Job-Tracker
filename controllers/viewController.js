const Job = require("../models/Job");
const User = require("../models/User");

const register = (req, res) => {
  req.logout;
  res.render("register");
};

const logOut = (req, res) => {
  req.logout;
  req.session.destroy((err) => res.render("landing"));
};

const profile = (req, res) => {
  res.render("profile", { user: req.user });
};

const stats = function (req, res) {
  let declined = 0;
  let interview = 0;
  let offered = 0;
  let onlineAssessment = 0;
  let pending = 0;

  const jobs = req.user.jobs;

  jobs.forEach((job) => {
    if (job.status == "Pending") {
      pending++;
    } else if (job.status == "Online-Assessment") {
      onlineAssessment++;
    } else if (job.status == "Interview") {
      interview++;
    } else if (job.status == "Offered") {
      offered++;
    } else {
      declined++;
    }
  });

  res.render("stats", {
    pending: pending,
    interview: interview,
    offered: offered,
    onlineAssessment: onlineAssessment,
    declined: declined,
  });
};

const viewAddJob = (req, res) => {
  res.render("add-job");
};

const viewAllJobs = function (req, res) {
  const filled = {
    status: "All",
    jobType: "All",
  };

  res.render("all-jobs", {
    totalJobs: req.user.jobs.length,
    filled: filled,
    allJobs: req.user.jobs,
  });
};

const filteredJobs = function (req, res) {
  const filled = req.body;
  let jobs = [];
  req.user.jobs.forEach((job) => {
    let flag = 1;
    if (filled.status == "All" || filled.status == job.status) {
      flag &= 1;
    } else {
      flag = 0;
    }
    if (filled.jobType == "All" || filled.jobType == job.jobType) {
      flag &= 1;
    } else {
      flag = 0;
    }
    if (flag == 1) {
      jobs.push(job);
    }
  });
  res.render("all-jobs", {
    totalJobs: jobs.length,
    filled: filled,
    allJobs: jobs,
  });
};

const viewEditJob = async (req, res) => {
  const idToEdit = req.params._id;
  const job = await Job.findOne({ _id: idToEdit });
  if (job) {
    res.render("edit", { job: job });
  }
};

module.exports = {
  stats,
  viewAddJob,
  profile,
  viewEditJob,
  viewAllJobs,
  filteredJobs,
  register,
  logOut,
};
