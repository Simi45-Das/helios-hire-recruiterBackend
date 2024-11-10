const { google } = require("googleapis");
const { Readable } = require("stream");

// Load service account credentials
const KEYFILE_PATH = "./service_account.json"; // Direct key file path
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

// Initialize Google Drive API
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILE_PATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: "v3", auth });

exports.uploadFileToDrive = async (fileName, jsonContent) => {
  try {
    // Create a readable stream from the JSON content
    const bufferStream = new Readable();
    bufferStream.push(jsonContent);
    bufferStream.push(null); // Signal that the stream is finished

    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: ["167venyrS69yyIyGuNH1yjbpsJdbAnQhZ"], // Your Google Drive folder ID
        mimeType: "application/json",
      },
      media: {
        mimeType: "application/json",
        body: bufferStream, // Use the readable stream here
      },
    });

    const fileId = response.data.id;

    // Make the file publicly accessible
    await drive.permissions.create({
      fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    // Get the public URL of the uploaded file
    const result = await drive.files.get({
      fileId,
      fields: "webViewLink",
    });

    return result.data.webViewLink;
  } catch (error) {
    console.error("Error uploading file to Google Drive", error);
    throw error;
  }
};
