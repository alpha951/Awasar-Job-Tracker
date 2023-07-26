const mongoose = require("mongoose");
const getDate = require("../utils/getDate");
const jobsSchema = new mongoose.Schema(
  {
    position: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    jobLocation: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobsSchema);

