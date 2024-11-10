const { uploadFileToDrive } = require("../services/notification");
const Notification = require("../models/notification");
const fs = require("fs");

exports.createNotification = async (req, res) => {
  try {
    const {
      notificationTitle,
      notificationText,
      notificationDate,
      notificationTime,
    } = req.body;
    let pdfUrl = null;

    // Handle PDF upload if it exists
    if (req.file) {
      // Upload PDF to Google Drive
      const pdfPath = req.file.path;
      pdfUrl = await uploadFileToDrive(pdfPath, req.file.filename);
      fs.unlinkSync(pdfPath); // Delete local file after upload
    }

    // Save notification to MongoDB
    const newNotification = new Notification({
      notificationTitle,
      notificationText,
      pdfUrl,
      notificationDate,
      notificationTime,
    });

    await newNotification.save();
    res.status(201).json({ message: "Notification created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
