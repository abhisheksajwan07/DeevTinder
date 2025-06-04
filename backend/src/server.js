const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database.js");

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); //whenver im reading the req.,
app.use(cookieParser());
//i want that req's data to be passed into json data

const authRouter = require("./routes/auth.routes.js");
const profileRouter = require("./routes/profile.routes.js");
const requestRouter = require("./routes/requests.routes.js");
const userRouter = require("./routes/user.routes.js");

const port = process.env.PORT || 3000;
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("db connected");
    app.listen(port, () => {
      console.log("server is succesffully listening on port " + port);
    });
  })
  .catch((err) => console.error("db error"));
