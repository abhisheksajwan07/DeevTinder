const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database.js");

const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json()); //whenver im reading the req.,
app.use(cookieParser());
//i want that req's data to be passed into json data

// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     if (users.length === 0) {
//       res.send("No user found");
//     } else {
//       console.log(users);
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });
// app.get("/user", async (req, res) => {
//   //getting user from body
//   const userEmail = req.body.emailId;
//   try {
//     const users = await User.findOne({ emailId: userEmail });
//     if (users.length === 0) {
//       res.status(400).send("User not found");
//     } else {
//       // console.log(users)
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });
// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;

//   try {
//     const users = await User.findByIdAndDelete(userId);
//     res.send("User deleted Successfully");
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

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
