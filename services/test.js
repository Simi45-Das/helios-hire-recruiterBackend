const Test = require("../models/questionPaper/test");
const QuestionPaper = require("../models/questionPaper/questionPaper");
const Questions = require("../models/questionPaper/questions");
const Answers = require("../models/questionPaper/answers");
const CandidateScores = require("../models/questionPaper/candidateScores");
const CandidateResponses = require("../models/questionPaper/candidateResponses");

// Service for creating a test
const createTest = async (testDetails) => {
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
  } = testDetails;

  const { totalMarks, passingMarks, questions } = questionPaperDetails;

  // Create the QuestionPaper document
  const questionPaper = new QuestionPaper({ totalMarks, passingMarks });
  const questionIds = [];

  // Create each question document
  for (const q of questions) {
    const {
      questionText,
      questionType,
      isMedia,
      media,
      fullMark,
      optionalAnswers,
      correctAnswer,
    } = q;

    const question = new Questions({
      question: questionText,
      questionType,
      isMedia,
      media,
      fullMark,
      optionalAnswers,
    });

    await question.save();
    questionIds.push(question._id);

    // Save the correct answer if it's an optional question
    if (questionType === "optional" && correctAnswer) {
      const answer = new Answers({
        questionPaperId: questionPaper._id,
        questionId: question._id,
        questionType: "optional",
        answer: correctAnswer,
      });
      await answer.save();
    }
  }

  questionPaper.questionIds = questionIds;
  await questionPaper.save();

  const test = new Test({
    questionPaperId: questionPaper._id,
    fullMarks,
    totalDuration,
    recruiterId,
    companyId,
    role,
    testExpiry,
    technology,
    region,
  });
  await test.save();

  return {
    message: "Test created successfully",
    testId: test._id,
    questionPaperId: questionPaper._id,
  };
};

// Service for getting test by ID
const getTestById = async (testId) => {
  const test = await Test.findById(testId).populate("questionPaperId");

  if (!test) {
    return null;
  }

  const questionPaper = await QuestionPaper.findById(
    test.questionPaperId._id
  ).populate("questionIds");

  const questionsWithAnswers = await Promise.all(
    questionPaper.questionIds.map(async (question) => {
      const questionDetails = await Questions.findById(question);
      return { ...questionDetails.toObject() };
    })
  );

  return {
    testId: test._id,
    fullMarks: test.fullMarks,
    totalDuration: test.totalDuration,
    questions: questionsWithAnswers,
  };
};

// Service for submitting candidate responses
const submitResponses = async ({
  candidateId,
  testId,
  questionPaperId,
  responses,
}) => {
  const existingSubmission = await CandidateResponses.findOne({
    candidateId,
    testId,
  });

  if (existingSubmission) {
    return {
      message: "You have already submitted your responses for this test.",
      error: true,
    };
  }

  let totalScore = 0;
  let totalTestScore = 0;
  let isAllOptional = true;

  for (const response of responses) {
    const { questionId, answer } = response;
    const question = await Questions.findById(questionId);

    if (!question) {
      return { message: "Question not found", error: true };
    }

    const candidateResponse = new CandidateResponses({
      candidateId,
      testId,
      questionPaperId,
      questionId,
      answer,
      mark: question.fullMark,
    });

    await candidateResponse.save();

    if (question.questionType === "optional") {
      const correctAnswer = await Answers.findOne({
        questionId,
        questionPaperId,
      });

      if (correctAnswer && answer === correctAnswer.answer) {
        totalScore += question.fullMark;
      } else {
        candidateResponse.mark = 0;
      }

      totalTestScore += question.fullMark;
    } else {
      isAllOptional = false;
    }
  }

  if (isAllOptional) {
    const candidateScore = new CandidateScores({
      candidateId,
      testId,
      totalTestScore,
      totalEarnedScore: totalScore,
    });

    await candidateScore.save();
  }

  return { message: "Responses submitted successfully", totalScore };
};

module.exports = {
  createTest,
  getTestById,
  submitResponses,
};
