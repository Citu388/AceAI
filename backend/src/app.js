const express = require("express");
const app = express();

const authRouter = require("./routes/auth.routes");

app.use("/api/auth", authRouter);

app.use(express.json());

module.exports = app;
