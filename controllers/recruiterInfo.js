const authService = require("../services/recruiterInfo");

exports.register = async (req, res) => {
  try {
    const recruiter = await authService.registerRecruiter(req.body);
    res
      .status(201)
      .json({ message: "Recruiter registered successfully", recruiter });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { token, recruiterId } = await authService.loginRecruiter(req.body);
    res.json({ token, recruiterId });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
