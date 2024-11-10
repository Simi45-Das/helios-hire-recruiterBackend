const express = require("express");
const authController = require("../controllers/recruiterInfo");
const router = express.Router();

// Register
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

module.exports = router;
