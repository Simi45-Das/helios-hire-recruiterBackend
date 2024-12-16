const photoService = require("../services/uploadPhoto");
const fs = require("fs");
const path = require("path");
const axios = require("axios");

// Utility function to handle missing companyId
const checkCompanyId = (req, res) => {
  const { companyId } = req.user; // Extracted from JWT middleware
  if (!companyId) {
    return res.status(400).json({ message: "Company ID not found in token." });
  }
  return companyId;
};

// Controller function to upload photos
const uploadPhotos = async (req, res) => {
  try {
    const companyId = checkCompanyId(req, res);
    if (!companyId) return; // If companyId is missing, we already sent the response

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files provided." });
    }

    const fileUrls = [];

    // Iterate over files and upload them
    for (const file of req.files) {
      const fileUrl = await photoService.uploadToDrive(file); // Use uploadToDrive from the service
      fileUrls.push(fileUrl);
    }

    // Save URLs in MongoDB with the companyId
    await photoService.savePhotoUrls({ urls: fileUrls, companyId });

    // Clean up temp files locally after upload (asynchronous)
    await Promise.all(
      req.files.map(async (file) => fs.promises.unlink(file.path)) // Use fs.promises.unlink for async operation
    );

    res.status(200).json({ message: "Files uploaded successfully", fileUrls });
  } catch (error) {
    console.error("Error in uploadPhotos:", error.message);
    res.status(500).json({ message: "Error uploading files." });
  }
};

// Controller function to get photos by companyId
// const getPhotosByCompanyId = async (req, res) => {
//   try {
//     const companyId = checkCompanyId(req, res);
//     if (!companyId) return; // If companyId is missing, we already sent the response

//     const photos = await photoService.getPhotosByCompanyId(companyId); // Fetch photos for this company

//     if (!photos || photos.urls.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No photos found for this company." });
//     }

//     res.status(200).json({ urls: photos.urls });
//   } catch (error) {
//     console.error("Error in getPhotosByCompanyId:", error.message);
//     res.status(500).json({ message: "Error fetching photos." });
//   }
// };

const getPhotosByCompanyId = async (req, res) => {
  try {
    let { companyId, type } = req.query; // Retrieve type and companyId from the query parameters

    // If the type is 'recruiter', retrieve the companyId from the JWT
    if (type === "recruiter") {
      companyId = req.user.companyId; // Assuming req.user is populated by a middleware that verifies the JWT
    }

    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required." });
    }

    const photos = await photoService.getPhotosByCompanyId(companyId); // Fetch photos for this company

    if (!photos || !photos.urls || photos.urls.length === 0) {
      return res
        .status(404)
        .json({ message: "No photos found for this company." });
    }

    res.status(200).json({ urls: photos.urls });
  } catch (error) {
    console.error("Error in getPhotosByCompanyId:", error.message);
    res.status(500).json({ message: "Error fetching photos." });
  }
};

const viewImages = async (req, res) => {
  try {
    const imageUrls = JSON.parse(req.query.urls); // Expecting an array of image URLs in the query string
    console.log("Image URLs: ", imageUrls);

    if (!imageUrls || !Array.isArray(imageUrls)) {
      return res.status(400).send("Please provide an array of image URLs.");
    }

    const imagePromises = imageUrls.map((imageUrl) =>
      axios.get(imageUrl, { responseType: "arraybuffer" })
    );

    // Wait for all image requests to finish
    const imageResponses = await Promise.all(imagePromises);

    // Convert images to Base64
    const images = imageResponses.map((response) => {
      return `data:image/jpeg;base64,${Buffer.from(response.data).toString(
        "base64"
      )}`;
    });

    res.json({ images });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).send("Error fetching images.");
  }
};

module.exports = {
  uploadPhotos,
  getPhotosByCompanyId,
  viewImages,
};
