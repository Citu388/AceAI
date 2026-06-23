const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Please log in to continue",
    });
  }

  const isTokenBlackListed = await tokenBlacklistModel.findOne({ token });

  if (isTokenBlackListed) {
    return res.status(401).json({
      message: "Your session has expired. Please log in again",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Your session has expired. Please log in again",
    });
  }
}

model.exports = { authUser };
