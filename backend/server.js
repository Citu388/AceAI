require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");
const invokeGeminiAi = require("./src/services/ai.service");
const {
  resume,
  selfDescription,
  jobDescription,
} = require("./src/services/temp.js");
const { generateInterviewReport } = require("./src/services/ai.service.js");
connectToDB();
generateInterviewReport({ resume, selfDescription, jobDescription });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
