const express = require("express");
const connectDatabase = require("./config/database");

const app = express();

const startServer = async () => {
  try {
    await connectDatabase();

    app.get("/", (req, res) => {
      res.send("Node backend running 🚀");
    });

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });

  } catch (error) {
    console.log("Server failed to start ❌");
  }
};

startServer();