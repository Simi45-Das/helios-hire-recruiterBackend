const express = require("express");
const router = express.Router();
const JobController = require("../controllers/jobpost");

// POST route to create a job post
router.post("/postJob", JobController.postJob);

module.exports = router;
