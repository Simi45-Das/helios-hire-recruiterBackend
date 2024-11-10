const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionPaperSchema = new Schema(
  {
    // id: { type: Schema.Types.ObjectId, auto: true },
    questionIds: [
      { type: Schema.Types.ObjectId, ref: "Questions", required: true },
    ],
    totalMarks: { type: Number, required: true },
    passingMarks: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuestionPaper", questionPaperSchema);
