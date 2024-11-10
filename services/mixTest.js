const { google } = require("googleapis");
const fs = require("fs");
const Test = require("../models/mixTest");
const { Readable } = require("stream");

// Google Drive authentication setup
const auth = new google.auth.GoogleAuth({
  keyFile: "./service_account.json", // Direct path to the service account JSON file
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

const saveTestToGoogleDrive = async (testData) => {
  const fileMetadata = {
    name: `${testData.testName}.json`,
    parents: ["10o4gAl3IsahpOCjNP76L8JchCUVEJCOW"],
  };

  const fileStream = Readable.from(JSON.stringify(testData));

  const media = {
    mimeType: "application/json",
    body: fileStream,
  };

  const response = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: "id,webViewLink",
  });

  return response.data.webViewLink;
};

const saveTestUrlInDB = async (testName, url) => {
  const newTest = new Test({ testName, googleDriveUrl: url });
  await newTest.save();
};

module.exports = { saveTestToGoogleDrive, saveTestUrlInDB };
