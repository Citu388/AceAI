require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB()
  .then(() => {
    console.log("Connected to DB");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });
