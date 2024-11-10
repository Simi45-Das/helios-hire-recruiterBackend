const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    testName: String,
    fullMarks: Number,
    timeLimit: Number,
    questions: [
      {
        questionText: String,
        marks: Number,
        options: [String],
        correctAnswer: String,
      },
    ],
    driveUrl: String, // URL where test is saved on Google Drive
  },
  { timestamps: true }
);

module.exports = mongoose.model("mcq_test", testSchema);
