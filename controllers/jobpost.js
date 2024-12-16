const JobPost = require("../models/jobPost");
const createJobPost = async (req, res) => {
  try {
    // Extract job post details from the request body
    const {
      title,
      company,
      location,
      employmentType,
      remote,
      description,
      responsibilities,
      requirements,
      preferredSkills,
      salary,
      benefits,
      experienceLevel,
      applicationDeadline,
      tags,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !company ||
      !location ||
      !employmentType ||
      !description ||
      !experienceLevel ||
      !applicationDeadline
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const companyId = req.user.companyId;

    // Create a new job post
    const newJobPost = new JobPost({
      title,
      company,
      companyId,
      location,
      employmentType,
      remote: remote || false, // Default to false if not provided
      description,
      responsibilities: responsibilities || [],
      requirements: requirements || [],
      preferredSkills: preferredSkills || [],
      salary: salary || {},
      benefits: benefits || [],
      experienceLevel,
      applicationDeadline,
      tags: tags || [],
      postedBy: req.user.id, // Assuming req.user contains the authenticated user's ID
    });

    // Save the job post to the database
    const savedJobPost = await newJobPost.save();

    // Respond with the saved job post
    res.status(201).json(savedJobPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getJobPostsById = async (req, res) => {
  try {
    const { jobPostId } = req.query;
    const jobPost = await JobPost.findById(jobPostId);
    if (!jobPost) {
      return res.status(404).json({ message: "Job post not found" });
    }
    res.status(200).json(jobPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getJobPostsByCompanyId = async (req, res) => {
  try {
    const { companyId, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const jobPosts = await JobPost.find({ companyId })
      .skip(skip)
      .limit(parseInt(limit));
    res.status(200).json(jobPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createJobPost,
  getJobPostsById,
  getJobPostsByCompanyId,
};
