const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const candidateScoresSchema = new Schema(
  {
    // id: { type: Schema.Types.ObjectId, auto: true },
    candidateId: {
      type: Schema.Types.ObjectId,
      //   ref: "Candidate",
      required: true,
    },
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true },
    totalTestScore: { type: Number, required: false },
    totalEarnedScore: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CandidateScores", candidateScoresSchema);
