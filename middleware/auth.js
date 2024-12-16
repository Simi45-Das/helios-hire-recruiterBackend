const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authenticate = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const authorizationType = req.header("Authorization-Type");

  if (authorizationType === "candidate") {
    next();
    return;
  }

  const userTypes = ["recruiter", "candidate", "admin"];
  if (!authorizationType || !userTypes.includes(authorizationType)) {
    return res.status(400).json({ message: "Invalid authorization type." });
  } else if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  const token = authHeader?.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach decoded payload to the request
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(400).json({ message: "Invalid token." });
  }
};
