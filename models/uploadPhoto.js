const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  companyId: {
    type: String, // Storing as a simple string instead of ObjectId
    required: true, // Ensures every record has a companyId
  },
  urls: [
    {
      type: String, // Storing URLs as strings in an array
      required: true, // Ensures URLs are provided
    },
  ],
  uploadedAt: {
    type: Date,
    default: Date.now, // Automatically sets the upload time
  },
});

module.exports = mongoose.model("CompanyPhoto", photoSchema);
