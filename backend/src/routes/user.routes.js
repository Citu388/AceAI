const express = require("express");
const userRouter = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

userRouter.get(
  "/get-me",
  authMiddleware.authUser,
  userController.getUserController,
);

module.exports = userRouter;
