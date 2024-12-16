const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  notificationTitle: {
    type: String,
    required: true,
  },
  notificationText: {
    type: String,
  },
  pdfUrl: {
    type: String, // To store the Google Drive URL of the uploaded PDF
  },
  notificationDate: {
    type: String,
    required: true,
  },
  notificationTime: {
    type: String,
    required: true,
  },
  companyId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("notification_details", notificationSchema);
