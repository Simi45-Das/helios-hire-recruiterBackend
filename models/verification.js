// companyModel.js
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  physicalAddress: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String, required: true },
});

const Company = mongoose.model("companyVerification_details", companySchema);

module.exports = Company;
