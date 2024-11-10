const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  password: { type: String, required: true },
  recruiterId: { type: String, unique: true },
  date: { type: Date, default: Date.now },
});

const Recruiter = mongoose.model("recruiter_info", recruiterSchema);

module.exports = Recruiter;
