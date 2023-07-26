const mongoose = require("mongoose");
const Job = require("../models/Job");
const User = require("../models/User");
const getDate = require("../utils/getDate");
const { logOut } = require("./viewController");

const addJob = async function (req, res) {
  const filled = req.body;

  const { position, company, jobLocation, status, jobType, date } = filled;

  const newJob = new Job({
    position: position,
    company: company,
    jobLocation: jobLocation,
    status: status,
    jobType: jobType,
    date: getDate(date),
  });

  const user = await User.findById(req.user._id);

  if (user) {
    user.jobs.push(newJob);
    await user.save();
    newJob.username = user.username;
    await newJob.save();
    // res.render("all-jobs", { filled: { status: "All", jobType: "All" } });
    res.redirect("/jobs/all-jobs");
  } else {
    console.log("failed adding jobs");
    res.redirect("/jobs/stats");
  }
};

const editJob = async function (req, res) {
  const idToEdit = req.params._id;
  const updatedData = req.body;

  if (updatedData.date == "") updatedData.date = Date;
  else updatedData.date = getDate(updatedData.date);

  // Job.updateOne({ _id: idToEdit }, updatedData, (err) => {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     User.updateOne(
  //       { username: req.user.username, "jobs._id": idToEdit },
  //       {
  //         $set: {
  //           "jobs.$.position": updatedData.position,
  //           "jobs.$.company": updatedData.company,
  //           "jobs.$.jobLocation": updatedData.jobLocation,
  //           "jobs.$.status": updatedData.status,
  //           "jobs.$.jobType": updatedData.jobType,
  //           "jobs.$.date": updatedData.date,
  //         },
  //       },
  //       (err) => {
  //         if (err) {
  //           console.log(err);
  //         } else {
  //           res.redirect("/jobs/all-jobs");
  //         }
  //       }
  //     );
  //   }
  // });
  await Job.findOneAndUpdate({ _id: idToEdit }, updatedData, {
    new: true,
    runValidators: true,
  });
  res.redirect("/jobs/all-jobs");
};

const deleteJob = async function (req, res) {
  const idToDelete = req.params._id;
  await Job.findByIdAndDelete(idToDelete);
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { jobs: { _id: idToDelete } },
  });

  res.redirect("/jobs/stats");
};

const updateProfile = async function (req, res) {
  console.log("Updating profile");
  const updatedData = req.body;
  console.log(updatedData);
  delete updatedData.username; // can't change username
  if (updatedData.name == "") {
    delete updatedData.name;
  }
  if (updatedData.number == "") {
    delete updatedData.number;
  }
  if (updatedData.location == "") {
    delete updatedData.location;
  }

  await User.updateOne({ username: req.user.username }, updatedData);
  res.redirect("/jobs/stats");
};

module.exports = {
  addJob,
  editJob,
  deleteJob,
  updateProfile,
};
