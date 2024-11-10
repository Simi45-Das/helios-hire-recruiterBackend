const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  urls: [
    // Array to store multiple URLs
    {
      type: String,
      required: true,
    },
  ],
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("company_photo", photoSchema);
