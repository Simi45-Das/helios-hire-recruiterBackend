const User = require("../models/auth");
const { sendEmail } = require("../services/auth");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { email, password, fullName, companyName } = req.body;

  // Generate a random company ID
  const companyId = crypto.randomBytes(4).toString("hex").toUpperCase();

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user in DB
    const newUser = new User({
      email,
      password: hashedPassword,
      companyId,
      fullName,
      companyName,
    });
    await newUser.save();

    // Send company ID to user's email
    await sendEmail(email, companyId);

    res.status(201).json({
      message: "Registration successful! Check your email for Company ID.",
      companyId,
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed.", error });
  }
};

exports.login = async (req, res) => {
  const { companyId, password } = req.body;

  try {
    // Find user by company ID
    const user = await User.findOne({
      companyId,
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "Invalid Company ID or password" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid Company ID or password" });
    }

    // Create and sign JWT token
    const payload = {
      id: user.id,
      companyId: user.companyId,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
