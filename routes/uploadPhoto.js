const express = require("express");
const multer = require("multer");
const photoController = require("../controllers/uploadPhoto");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/upload",
  upload.array("photos", 10),
  photoController.uploadPhotos
);

module.exports = router;
