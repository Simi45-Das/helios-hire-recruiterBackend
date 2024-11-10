const testService = require("../services/test");

// Controller for creating a test
const createTest = async (req, res) => {
  try {
    const {
      questionPaperDetails,
      fullMarks,
      totalDuration,
      recruiterId,
      companyId,
      role,
      testExpiry,
      technology,
      region,
    } = req.body;
    const response = await testService.createTest({
      questionPaperDetails,
      fullMarks,
      totalDuration,
      recruiterId,
      companyId,
      role,
      testExpiry,
      technology,
      region,
    });

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating test", error });
  }
};

// Controller for retrieving a test by ID
const getTestById = async (req, res) => {
  try {
    const { testId } = req.params;
    const response = await testService.getTestById(testId);

    if (!response) {
      return res.status(404).json({ message: "Test not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving test", error });
  }
};

// Controller for submitting candidate responses
const submitResponses = async (req, res) => {
  const { candidateId, testId, questionPaperId, responses } = req.body;

  try {
    const response = await testService.submitResponses({
      candidateId,
      testId,
      questionPaperId,
      responses,
    });

    if (response.error) {
      return res.status(400).json(response);
    }

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting responses", error });
  }
};

module.exports = {
  createTest,
  getTestById,
  submitResponses,
};
