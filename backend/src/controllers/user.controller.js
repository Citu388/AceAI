const userModel = require("../models/user.model");

async function getUserController(req, res) {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "User data fetched successfully",
    userData: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
  });
}

module.exports = { getUserController };
