const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  details: { type: String, required: true },
  postedAt: { type: Date, default: Date.now },
});

const Job = mongoose.model("postjob_details", jobSchema);

module.exports = Job;
