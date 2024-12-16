const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company:{
      type: String,
      required: true,
      trim:true,
    },
    
    companyId: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    employmentType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Contract", "Internship", "Freelance"],
      required: true,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    requirements: {
      type: [String],
      default: [],
    },
    preferredSkills: {
      type: [String],
      default: [],
    },
    salary: {
      min: {
        type: Number,
        default: null,
      },
      max: {
        type: Number,
        default: null,
      },
      currency: {
        type: String,
        default: "USD",
      },
    },
    benefits: {
      type: [String],
      default: [],
    },
    experienceLevel: {
      type: String,
      enum: ["Entry", "Mid", "Senior", "Director", "Executive"],
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming a User model for recruiters/admins
      required: true,
    },
    applicants: [
      {
        applicantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to applicants (users)
        },
        status: {
          type: String,
          enum: ["Applied", "Under Review", "Shortlisted", "Rejected", "Hired"],
          default: "Applied",
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    applicationDeadline: {
      type: Date,
      required: true,
    },
    tags: {
      type: [String], // Tags for job search (e.g., "React", "Remote", "Startup")
      default: [],
    },
    status: {
      type: String,
      enum: ["Open", "Closed", "Draft"],
      default: "Open",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("JobPost", jobPostSchema);
