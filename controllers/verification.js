// companyController.js
const companyService = require("../services/verification");

const submitCompanyVerification = async (req, res) => {
  try {
    const companyData = req.body;
    await companyService.verifyCompany(companyData);
    res
      .status(201)
      .json({ message: "Company verification submitted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  submitCompanyVerification,
};
