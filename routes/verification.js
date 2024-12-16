const express = require("express");
const router = express.Router();
const companyController = require("../controllers/verification");

// Route to submit company verification
router.post(
  "/submit-company-verification",
  companyController.submitCompanyVerification
);

// Route to get all company names
router.get("/get-all-company-names", companyController.getAllCompanyNames);

module.exports = router;
