const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  testName: { type: String, required: true },
  googleDriveUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Test = mongoose.model("mcq&descriptive_test", TestSchema);
module.exports = Test;
