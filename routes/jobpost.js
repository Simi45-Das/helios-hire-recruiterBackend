const express = require("express");
const router = express.Router();
const {
  createJobPost,
  getJobPostsById,
  getJobPostsByCompanyId,
} = require("../controllers/jobpost");
const { authenticate } = require("../middleware/auth");

router.post("/create-job-post", authenticate, createJobPost);
router.get("/get-job-posts-by-id/:id", authenticate, getJobPostsById);
router.get(
  "/get-job-posts-by-company-id",
  authenticate,
  getJobPostsByCompanyId
);

module.exports = router;
