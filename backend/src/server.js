const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database.js");
const port = process.env.PORT || 3000;

const app = express();

connectDB()
  .then(() => {
    console.log("db connected");
    app.listen(port, () => {
      console.log("server is succesffully listening on " + port);
    });
  })
  .catch((err) => console.error("db error"));
