const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection established");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
