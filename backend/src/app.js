const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.routes");

app.use("/api/auth", authRouter);

app.use(express.json());
app.use(cookieParser());

module.exports = app;
