// companyRouter.js
const express = require("express");
const router = express.Router();
const companyController = require("../controllers/verification");

router.post(
  "/submit-company-verification",
  companyController.submitCompanyVerification
);

module.exports = router;
