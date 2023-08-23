const Job = require("../models/Job"); // Adjust the path to your Task model
const connectDB = require("../db/dbConnect");
const dotenv = require("dotenv");

dotenv.config();
connectDB(process.env.MONGODB_URI);

/*
 * This cron job will delete all jobs older than 30 days.
 * It will run every day at 00:00.
 */

async function deleteOldJobs() {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  try {
    await Job.deleteMany({ createdAt: { $lt: thirtyDaysAgo } });
    console.log("Cron job: Deleted jobs older than 30 days.");
  } catch (error) {
    console.error("Cron job error:", error);
  }
}

module.exports = deleteOldJobs;
