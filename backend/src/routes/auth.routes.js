const express = require("express");
// const router = express.Router();
// router.use()
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validations");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data

    validateSignUpData(req);
    //encrypt the pass
    const { firstName, lastName, emailId, password } = req.body;
    const passwordHashed = await bcrypt.hash(password, 10);
    //creating user instance of User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHashed,
    });
    await user.save();

    res.send("User Added succesffully");
  } catch (err) {
    res.status(400).send("ERROR" + err.message);
  }
});
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credential");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //jwt
      const token = await user.getJWT();
      // add the token to cookie and send the response back
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login succesfully!");
    } else {
      throw new Error("Invalid credential");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send();
});
module.exports = authRouter;
