const photoService = require("../services/uploadPhoto");
const fs = require("fs");

const uploadPhotos = async (req, res) => {
  try {
    const fileUrls = [];

    for (const file of req.files) {
      const fileUrl = await photoService.uploadToDrive(file);
      fileUrls.push(fileUrl);
    }

    // Save all file URLs under one MongoDB document
    await photoService.savePhotoUrls(fileUrls);

    // Clean up local temp files after upload
    req.files.forEach((file) => fs.unlinkSync(file.path));

    res.status(200).json({ message: "Files uploaded successfully", fileUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading files" });
  }
};

module.exports = {
  uploadPhotos,
};
