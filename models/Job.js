const mongoose = require("mongoose");
const getDate = require("../utils/getDate");
const jobsSchema = new mongoose.Schema({
  position: {
    type: String,
  },
  company: {
    type: String,
  },
  jobLocation: {
    type: String,
  },
  status: {
    type: String,
  },
  jobType: {
    type: String,
  },
  date: {
    type: String,
  },
});

module.exports = mongoose.model("Job", jobsSchema);

// const mongoose = require("mongoose");

// const JobSchema = new mongoose.Schema(
//   {
//     company: {
//       type: String,
//       required: [true, "Please provide company name"],
//       maxlength: 50,
//     },
//     position: {
//       type: String,
//       required: [true, "Please provide position"],
//       maxlength: 100,
//     },
//     status: {
//       type: String,
//       // enum: ["interview", "declined", "pending"],
//       default: "pending",
//     },
//     jobLocation: {
//       type: String,
//       required: true,
//     },
//     jobType: {
//       type: String,
//       required: true,
//     },
//     date: {
//       type: String,
//     },
//     createdBy: {
//       type: mongoose.Types.ObjectId,
//       ref: "User",
//       required: [true, "Please provide user"],
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Job", JobSchema);
