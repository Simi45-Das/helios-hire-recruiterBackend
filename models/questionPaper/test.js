const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema(
  {
    // id: { type: Schema.Types.ObjectId, auto: true },
    questionPaperId: {
      type: Schema.Types.ObjectId,
      ref: "QuestionPaper",
      required: true,
    },
    fullMarks: { type: Number, required: true },
    totalDuration: { type: Number, required: false },
    recruiterId: {
      type: Schema.Types.ObjectId,
      ref: "RecruiterDetails",
      required: true,
    },
    companyId: { type: Schema.Types.ObjectId, ref: "Company", required: true },
    role: { type: String, required: false },
    testExpiry: { type: Date, default: Infinity },
    technology: { type: String, required: false },
    region: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Test", testSchema);
