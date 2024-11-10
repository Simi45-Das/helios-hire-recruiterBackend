const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

// Setup Google Drive API authentication
const auth = new google.auth.GoogleAuth({
  keyFile: "./service_account.json",
  scopes: ["https://www.googleapis.com/auth/drive.file"],
});

const driveService = google.drive({ version: "v3", auth });

async function uploadFileToDrive(filePath, fileName) {
  try {
    const fileMetadata = {
      name: fileName,
      parents: ["16TeFrsQyteijapU9Pe0_DK2Rxi3bxIvD"], // Folder ID
    };

    const media = {
      mimeType: "application/pdf",
      body: fs.createReadStream(filePath),
    };

    const response = await driveService.files.create({
      resource: fileMetadata,
      media: media,
      fields: "id",
    });

    const fileId = response.data.id;
    const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file to Google Drive:", error);
    throw new Error("Google Drive upload failed");
  }
}

module.exports = {
  uploadFileToDrive,
};
