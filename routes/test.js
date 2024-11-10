const express = require("express");
const router = express.Router();
const testController = require("../controllers/test");

// Route for creating a test
router.post("/create-test", testController.createTest);

// Route for getting a test by ID
router.get("/get-test/:testId", testController.getTestById);

// Route for submitting candidate responses
router.post("/submit-responses", testController.submitResponses);

module.exports = router;
