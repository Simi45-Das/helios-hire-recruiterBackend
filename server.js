const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const companyRouter = require("./routes/verification");
const mcqtestRoutes = require("./routes/mcq_test");
const mixRoutes = require("./routes/mixTest");
const photoRouter = require("./routes/uploadPhoto");
const jobRouter = require("./routes/jobpost");
const formRoutes = require("./routes/createForm");
const notificationRoutes = require("./routes/notification");
const testRoutes = require("./routes/test");
const recruiterauthRoutes = require("./routes/recruiterInfo");


const app = express();

// Connect Database
connectDB();

// Bodyparser Middleware
app.use(bodyParser.json());


// Middleware for parsing JSON bodies and handling file uploads
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/company", companyRouter); 
app.use("/", mcqtestRoutes); 

app.use("/", mixRoutes);
app.use("/upload", photoRouter);
app.use("/", jobRouter);
app.use("/api/forms", formRoutes);
app.use("/", notificationRoutes);
app.use("/api/test", testRoutes);
app.use("/api/recruiter", recruiterauthRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
