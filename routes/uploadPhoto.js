const express = require("express");
const multer = require("multer");
const photoController = require("../controllers/uploadPhoto");
const { authenticate } = require("../middleware/auth"); // Import auth middleware
const axios = require("axios"); // Required for the new endpoint

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Upload photos for a company
router.post(
  "/uploadImages",
  authenticate,
  upload.array("photos", 10),
  photoController.uploadPhotos
);

// Get photos for a specific company
router.get("/getphotos", authenticate, photoController.getPhotosByCompanyId);
router.get("/viewphotos", photoController.viewImages);

// Fetch multiple images and return them in Base64 format
// router.get("/images", async (req, res) => {
//   try {
//     const imageUrls = JSON.parse(req.query.urls); // Expecting an array of image URLs in the query string
//     console.log("Image URLs: ", imageUrls);

//     if (!imageUrls || !Array.isArray(imageUrls)) {
//       return res.status(400).send("Please provide an array of image URLs.");
//     }

//     const imagePromises = imageUrls.map((imageUrl) =>
//       axios.get(imageUrl, { responseType: "arraybuffer" })
//     );

//     // Wait for all image requests to finish
//     const imageResponses = await Promise.all(imagePromises);

//     // Convert images to Base64
//     const images = imageResponses.map((response) => {
//       return `data:image/jpeg;base64,${Buffer.from(response.data).toString(
//         "base64"
//       )}`;
//     });

//     res.json({ images });
//   } catch (error) {
//     console.error("Error fetching images:", error);
//     res.status(500).send("Error fetching images.");
//   }
// });

module.exports = router;

//__________________________________________________________________________________________________________________

// const express = require("express");
// const multer = require("multer");
// const photoController = require("../controllers/uploadPhoto");
// const { authenticate } = require("../middleware/auth"); // Import auth middleware

// const router = express.Router();
// const upload = multer({ dest: "uploads/" });

// // Upload photos for a company
// router.post(
//   "/uploadImages",
//   authenticate,
//   upload.array("photos", 10),
//   photoController.uploadPhotos
// );

// // Get photos for a specific company
// router.get("/getphotos", authenticate, photoController.getPhotosByCompanyId);

// module.exports = router;
