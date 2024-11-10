const testService = require("../services/mixTest");

const createTest = async (req, res) => {
  try {
    const {
      testName,
      fullMarks,
      timeLimit,
      questions,
      questionType,
      marks,
      modelAnswers,
      options,
      correctAnswers,
    } = req.body;

    const testData = {
      testName,
      fullMarks,
      timeLimit,
      questions,
      questionType,
      marks,
      modelAnswers,
      options,
      correctAnswers,
    };

    const fileUrl = await testService.saveTestToGoogleDrive(testData);
    await testService.saveTestUrlInDB(testName, fileUrl);

    res
      .status(201)
      .json({ message: "Test created successfully", url: fileUrl });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the test" });
  }
};

module.exports = { createTest };
