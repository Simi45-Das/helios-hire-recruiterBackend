const mongoose = require("mongoose");

// Define the schema for the application form
const formSchema = new mongoose.Schema({
  formName: { type: String, required: true }, // The name of the form entered by the user
  formData: { type: Object, required: true }, // Stores the structure of the form as an object
  responses: [
    {
      responseData: { type: Object, required: true }, // Stores the user's responses to the form
      submittedAt: { type: Date, default: Date.now }, // Timestamp for when the response was submitted
    },
  ],
});

// Export the model
module.exports = mongoose.model("application_form", formSchema);
