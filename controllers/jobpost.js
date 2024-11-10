const JobService = require("../services/jobpost");

class JobController {
  async postJob(req, res) {
    try {
      const { details } = req.body;
      if (!details) {
        return res.status(400).json({ message: "Job details are required" });
      }
      const job = await JobService.createJob(details);
      res.status(201).json({ message: "Job posted successfully", job });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
}

module.exports = new JobController();
