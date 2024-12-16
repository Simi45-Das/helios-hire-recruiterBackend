const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const notificationController = require("../controllers/notification");
const { authenticate } = require("../middleware/auth");

// Multer configuration for PDF uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Temporary storage folder
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

// Routes
router.get(
  "/get-notification-by-company-id",
  authenticate, // Middleware to extract JWT
  notificationController.getNotificationByCompanyId
);

router.get(
  "/get-all-notifications",
  authenticate, // Authentication required
  notificationController.getAllNotifications
);

router.post(
  "/submit-notification",
  authenticate,
  upload.single("notificationPdf"), // File upload for notifications
  notificationController.createNotification
);

module.exports = router;
