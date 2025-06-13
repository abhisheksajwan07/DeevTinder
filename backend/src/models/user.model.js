const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
require("dotenv").config();

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true, //it will automatically create index
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Errror("invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: `{value} is not a valid gender type`,
      },

      // validate(value){
      //     if(!["male","female","others"].includes(value)){
      //         throw new Error ("Gender data isn't valid")
      //     }
      // }
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    membershipType: {
      type: String,
    },
    about: {
      type: String,
      default: "Default about",
    },
    photoUrl: {
      type: String,
      default: "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo address: " + value);
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ firstName: 1, lastName: 1 });
userSchema.methods.getJWT = async function () {
  const user = this; // works for only older functions
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};
userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};
// model is a class which create its own instances
module.exports = mongoose.model("User", userSchema);
