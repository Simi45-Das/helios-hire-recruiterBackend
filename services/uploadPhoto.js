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

  // Set file permission to public
  await drive.permissions.create({
    fileId: response.data.id,
    requestBody: {
      role: "reader",
      type: "anyone",
    },
  });

  const fileUrl = `https://drive.google.com/uc?id=${response.data.id}`;
  return fileUrl;
};

// Save multiple photo URLs in MongoDB under one object ID
const savePhotoUrls = async (urls) => {
  const photo = new Photo({ urls }); // Save URLs array
  await photo.save();
  return photo;
};

module.exports = {
  uploadToDrive,
  savePhotoUrls,
};
