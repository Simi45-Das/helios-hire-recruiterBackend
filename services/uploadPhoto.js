const { google } = require("googleapis");
const fs = require("fs");
const Photo = require("../models/uploadPhoto");

// Google Drive authentication setup
const auth = new google.auth.GoogleAuth({
  keyFile: "./service_account.json",
  scopes: ["https://www.googleapis.com/auth/drive"],
});
const drive = google.drive({ version: "v3", auth });

// Google Drive folder ID
const FOLDER_ID = "1vNeJNlR3n3YYVecnrYLtxq9CYbjp-98N";

// Function to upload a photo to Google Drive
const uploadToDrive = async (file) => {
  const fileMetadata = {
    name: file.originalname,
    parents: [FOLDER_ID],
  };

  const media = {
    mimeType: file.mimetype,
    body: fs.createReadStream(file.path),
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: "id",
  });

  const fileId = response.data.id;

  // Set file permission to public (anyone with the link)
  await drive.permissions.create({
    fileId: fileId,
    requestBody: {
      role: "reader", // Viewer access
      type: "anyone", // Anyone can view the file
    },
  });

  // Verify permissions
  const permissions = await drive.permissions.list({
    fileId: fileId,
  });
  console.log("Permissions for file:", permissions.data.items); // Log the permissions to confirm

  const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
  return fileUrl;
};

// Save multiple photo URLs in MongoDB under one object ID
const savePhotoUrls = async ({ urls, companyId }) => {
  const photo = new Photo({ urls, companyId }); // Ensure both urls and companyId are passed
  await photo.save();
  return photo;
};

// Get photos by companyId
const getPhotosByCompanyId = async (companyId) => {
  try {
    const photos = await Photo.findOne({ companyId });

    if (!photos) {
      throw new Error("No photos found for this company.");
    }

    return photos;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  uploadToDrive,
  savePhotoUrls,
  getPhotosByCompanyId,
};
