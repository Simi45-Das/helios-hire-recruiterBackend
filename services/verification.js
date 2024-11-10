const Company = require("../models/verification");

const verifyCompany = async (companyData) => {
  try {
    const newCompany = new Company(companyData);
    await newCompany.save();
  } catch (error) {
    console.error("Error saving company verification:", error);
    throw new Error("Failed to save company verification.");
  }
};

module.exports = {
  verifyCompany,
};
