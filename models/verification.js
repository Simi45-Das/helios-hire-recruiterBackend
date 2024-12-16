const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyId: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  registrationNumber: { type: String, required: true, unique: true },
  physicalAddress: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String, required: true },
});

module.exports = mongoose.model("Company", companySchema);
