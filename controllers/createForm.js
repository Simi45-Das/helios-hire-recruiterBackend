const Form = require("../models/createForm");

// Save a new form design
exports.saveFormDesign = async (req, res) => {
  try {
    const { formName, formData } = req.body;
    const newForm = new Form({ formName, formData });
    await newForm.save();
    res
      .status(201)
      .json({ message: "Form saved successfully", formId: newForm._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to save form" });
  }
};

// Submit a response to a form
exports.submitFormResponse = async (req, res) => {
  try {
    const { formId, responseData } = req.body;
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    form.responses.push({ responseData });
    await form.save();
    res.status(200).json({ message: "Form submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to submit form" });
  }
};

// Fetch form for user to fill
exports.getForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }
    res.json(form);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve form" });
  }
};
