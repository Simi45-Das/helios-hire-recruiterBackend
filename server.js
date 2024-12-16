const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const companyRouter = require("./routes/verification");
const mcqtestRoutes = require("./routes/mcq_test");
const mixRoutes = require("./routes/mixTest");
const photoRouter = require("./routes/uploadPhoto");
const jobpostRouter = require("./routes/jobpost");
const formRoutes = require("./routes/createForm");
const notificationRoutes = require("./routes/notification");
const testRoutes = require("./routes/test");
const recruiterauthRoutes = require("./routes/recruiterInfo");

const app = express();



app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    // allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Connect Database
connectDB();

// Bodyparser Middleware
app.use(bodyParser.json());

// Middleware for parsing JSON bodies and handling file uploads
app.use(express.json());

app.get("/health", async (req, res) => {
  res.status(200).json({ message: "Server is in healthy state" });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/company", companyRouter);
app.use("/", mcqtestRoutes);

app.use("/", mixRoutes);
app.use("/api/v1/upload", photoRouter);
app.use("/api/v1/job-posts", jobpostRouter);
app.use("/api/forms", formRoutes);
app.use("/api/test", testRoutes);
app.use("/api/recruiter", recruiterauthRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
