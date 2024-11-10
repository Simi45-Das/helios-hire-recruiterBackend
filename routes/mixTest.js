const express = require("express");
const router = express.Router();
const testController = require("../controllers/mixTest");

router.post("/createTest", testController.createTest);

module.exports = router;
