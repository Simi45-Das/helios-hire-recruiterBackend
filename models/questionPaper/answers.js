const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const answersSchema = new Schema(
  {
    // id: { type: Schema.Types.ObjectId, auto: true },
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
    questionType: {
      type: String,
      enum: ["mcq", "descriptive", "mcq&descriptive"],
      required: true,
    },
    answer: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answers", answersSchema);
