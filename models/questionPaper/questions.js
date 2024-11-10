const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    // id: { type: Schema.Types.ObjectId, auto: true },
    question: { type: String, required: true },
    questionType: {
      type: String,
      enum: ["optional", "subjective"],
      required: true,
    },
    // Array of possible answers for optional-type questions
    optionalAnswers: {
      type: [String], // Array of strings for multiple answers
      validate: {
        validator: function (value) {
          // Only allow optionalAnswers if the question type is 'optional'
          return this.questionType === "optional" ? value.length > 0 : true;
        },
        message: "Optional answers are required for optional-type questions.",
      },
    },
    isMedia: { type: Boolean, default: false },
    media: { type: String },
    fullMark: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Questions", questionSchema);
