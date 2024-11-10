const mongoose = require("mongoose");

const questionPaperSchema = new mongoose.Schema({
  questionIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Questions", // Referencing the Questions collection
      required: true,
    },
  ],
  totalMarks: {
    type: Number,
    required: true,
  },
  passingMarks: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const QuestionPaper = mongoose.model("Question_Paper", questionPaperSchema);

module.exports = QuestionPaper;
