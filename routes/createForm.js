const express = require("express");
const formController = require("../controllers/createForm");

const router = express.Router();

router.post("/saveForm", formController.saveFormDesign);
router.post("/submitForm", formController.submitFormResponse);
router.get("/getForm/:id", formController.getForm);

module.exports = router;
