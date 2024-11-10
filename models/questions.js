// models/Questions.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    question: { type: String, required: true },
    questionType: {
      type: String,
      enum: ["optional", "subjective"],
      required: true,
    },
    optionalAnswers: {
      type: [String],
      validate: {
        validator: function (value) {
          return this.questionType === "optional" ? value.length > 0 : true;
        },
        message: "Optional answers are required for optional-type questions.",
      },
    },
    isMedia: { type: Boolean, default: false },
    media: { type: String },
    fullMark: { type: Number, required: true },
    modelAnswer: { type: String, required: true }, // Added field
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Questions_type", questionSchema);
