const Test = require("../models/mcqTest");
const { uploadFileToDrive } = require("../services/mcq_test");
const { google } = require("googleapis");

// Function to create a test and save it directly to Google Drive
exports.createTest = async (req, res) => {
  try {
    const { testName, fullMarks, timeLimit, questions, marks, correctAnswers } =
      req.body;

    // Format the questions with options and correct answers
    const formattedQuestions = questions.map((questionText, index) => ({
      questionText,
      marks: marks[index],
      options: req.body[`options${index + 1}`], // Dynamically capture options
      correctAnswer: correctAnswers[index],
    }));

    // Create a new Test instance
    const newTest = new Test({
      testName,
      fullMarks,
      timeLimit,
      questions: formattedQuestions,
    });

    // Prepare the JSON content for the test
    const testJsonContent = JSON.stringify(newTest, null, 2);

    // Upload the JSON content to Google Drive
    const driveUrl = await uploadFileToDrive(
      `${testName}.json`,
      testJsonContent
    );

    // Save the Google Drive URL to the MongoDB database
    newTest.driveUrl = driveUrl;
    await newTest.save();

    // Respond with success
    res.status(201).json({ message: "Test created successfully", driveUrl });
  } catch (error) {
    console.error("Error creating test:", error);
    res.status(500).json({ error: error.message || "Failed to create test" });
  }
};
