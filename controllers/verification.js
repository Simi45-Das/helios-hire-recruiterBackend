const Company = require("../models/verification");
const User = require("../models/auth");

const submitCompanyVerification = async (req, res) => {
  try {
    const {
      companyId,
      companyName,
      registrationNumber,
      physicalAddress,
      contactNumber,
      email,
      website,
    } = req.body;

    // Check if the company ID exists in the recruiter_info collection
    const recruiter = await User.findOne({ companyId });

    if (!recruiter) {
      return res.status(404).json({ message: "Recruiter not found." });
    }

    // If the company ID matches in recruiter_info, check for duplicate registration
    const existingRegistration = await Company.findOne({
      registrationNumber,
    });
    if (existingRegistration) {
      return res.status(400).json({
        message: "Verification already submitted for this registration number.",
      });
    }

    // Save the verification details
    const newCompany = new Company({
      companyId,
      companyName,
      registrationNumber,
      physicalAddress,
      contactNumber,
      email,
      website,
    });

    await newCompany.save();

    res
      .status(201)
      .json({ message: "Company verification submitted successfully." });
  } catch (error) {
    console.error("Error in submitting company verification:", error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get all company names
const getAllCompanyNames = async (req, res) => {
  try {
    // Fetch both companyName and companyId from the database
    const companies = await Company.find({}, "companyId companyName");
    res.status(200).json(companies);
  } catch (error) {
    console.error("Error fetching company names:", error);
    res.status(500).json({ error: "Failed to fetch company names." });
  }
};

module.exports = {
  submitCompanyVerification,
  getAllCompanyNames,
};
