const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Recruiter = require("../models/recruiterInfo");

exports.registerRecruiter = async (recruiterData) => {
  const { name, email, company, password } = recruiterData;

  // Check if email already exists
  let recruiter = await Recruiter.findOne({ email });
  if (recruiter) {
    throw new Error("Email already exists");
  }

  // Create new recruiter
  const hashedPassword = await bcrypt.hash(password, 10);
  const recruiterId = `REC-${Math.floor(Math.random() * 1000000)}`;

  recruiter = new Recruiter({
    name,
    email,
    company,
    password: hashedPassword,
    recruiterId,
  });

  await recruiter.save();

  // Send recruiter ID via email
  await sendRecruiterIdEmail(email, recruiterId);

  return recruiter;
};

exports.loginRecruiter = async ({ recruiterId, password }) => {
  const recruiter = await Recruiter.findOne({ recruiterId });
  if (!recruiter) {
    throw new Error("Invalid recruiter ID");
  }

  const isMatch = await bcrypt.compare(password, recruiter.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  // Generate JWT token
  const token = jwt.sign(
    { recruiterId: recruiter.recruiterId },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  return { token, recruiterId: recruiter.recruiterId };
};

async function sendRecruiterIdEmail(email, recruiterId) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Recruiter ID",
    text: `Thank you for registering. Your recruiter ID is: ${recruiterId}`,
  };

  await transporter.sendMail(mailOptions);
}
