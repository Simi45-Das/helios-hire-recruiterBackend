const Job = require("../models/jobpost");

class JobService {
  async createJob(details) {
    const newJob = new Job({
      details: details,
    });
    return await newJob.save();
  }
}

module.exports = new JobService();
