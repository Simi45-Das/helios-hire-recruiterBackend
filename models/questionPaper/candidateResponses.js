const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const candidateResponsesSchema = new Schema(
  {
    // id: { type: Schema.Types.ObjectId, auto: true },
    candidateId: {
      type: Schema.Types.ObjectId,
      //   ref: "Candidate",
      required: true,
    },
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true },
    questionPaperId: {
      type: Schema.Types.ObjectId,
      ref: "QuestionPaper",
      required: true,
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Questions",
      required: true,
    },
    answer: { type: String, required: true },
    mark: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CandidateResponses", candidateResponsesSchema);
