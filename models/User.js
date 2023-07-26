const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');
const Job = require("./Job");

const usersSchema = new mongoose.Schema(
  {
    username: String,
    googleId: String,
    name: String,
    number: Number,
    location: String,
    password: String,
    jobs: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
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
    ],
  },
  { timestamps: true }
);

usersSchema.plugin(passportLocalMongoose);
usersSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', usersSchema);
