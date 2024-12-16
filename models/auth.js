const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyId: { type: String, required: true, unique: true },
    timestamp: { type: Date, default: Date.now },
    companyName: { type: String, required: true },
  },
  { timestamps: true }
); // Enable createdAt and updatedAt

module.exports = mongoose.model("user_info", userSchema);
