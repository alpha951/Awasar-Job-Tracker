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
    res.redirect("/jobs/all-jobs");
  } else {
    console.log("failed adding jobs");
    res.redirect("/jobs/stats");
  }
};


const editJob = async function (req, res) {
  const idToEdit = req.params._id;
  console.log("idToEdit is ", idToEdit);
  const updatedData = req.body;

  if (updatedData.date == "") updatedData.date = new Date().toISOString();
  updatedData.date = getDate(updatedData.date);

  try {
    console.log(updatedData);

    const updatedJob = await Job.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(idToEdit) },
      updatedData,
      { new: true }
    );

    if (!updatedJob) {
      console.log(updatedJob, "Couldn't update the job, job not found");
      res.redirect("/jobs/all-jobs");
    }

    const user = await User.findOne({
      username: req.user.username,
      "jobs._id": idToEdit,
    });

    if (!user) {
      console.log("User not found");
      res.redirect("/jobs/all-jobs");
    }

    const jobToUpdateIndex = user.jobs.findIndex(
      (job) => job._id.toString() === idToEdit
    );
    if (jobToUpdateIndex !== -1) {
      user.jobs[jobToUpdateIndex] = updatedJob;
    }

    await user.save();

    res.redirect("/jobs/all-jobs");
  } catch (err) {
    // Handle any errors that occurred during the update process
    console.error("Error updating job:", err);
    res.redirect("/jobs/all-jobs");
  }
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
