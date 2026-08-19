const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const interviewRouter = require("./routes/interview.routes");

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = ["http://localhost:5173", "https://aceai.site"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;
