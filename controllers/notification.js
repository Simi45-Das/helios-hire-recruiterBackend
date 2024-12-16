const { uploadFileToDrive } = require("../services/notification");
const Notification = require("../models/notification");
const fs = require("fs");

exports.createNotification = async (req, res) => {
  try {
    const {
      type,
      companyId: bodyCompanyId,
      notificationTitle,
      notificationText,
      notificationDate,
      notificationTime,
    } = req.body;

    let companyId = null;

    // Determine companyId based on type and JWT
    if (type === "recruiter" && req.user && req.user.recruiterId) {
      companyId = req.user.recruiterId;
    } else if (type !== "recruiter" && bodyCompanyId) {
      companyId = bodyCompanyId;
    }

    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    let pdfUrl = null;

    // Handle PDF upload
    if (req.file) {
      const pdfPath = req.file.path;
      pdfUrl = await uploadFileToDrive(pdfPath, req.file.filename);
      fs.unlinkSync(pdfPath); // Delete local file
    }

    // Save notification in MongoDB
    const newNotification = new Notification({
      notificationTitle,
      notificationText,
      pdfUrl,
      notificationDate,
      notificationTime,
      companyId,
    });

    await newNotification.save();
    res.status(201).json({ message: "Notification created successfully" });
  } catch (error) {
    console.error("Error in createNotification:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: "No notifications found" });
    }
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error in getAllNotifications:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getNotificationByCompanyId = async (req, res) => {
  try {
    const { companyId } = req.query;

    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    const notifications = await Notification.find({ companyId }).sort({
      createdAt: -1,
    });

    if (!notifications || notifications.length === 0) {
      return res.status(404).json({ message: "No notifications found" });
    }

    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error in getNotificationByCompanyId:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
