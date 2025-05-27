const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
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
    unique: true,
    trim: true,
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
    enum: ["male", "female", "others"],
    // validate(value){
    //     if(!["male","female","others"].includes(value)){
    //         throw new Error ("Gender data isn't valid")
    //     }
    // }
  },
  photoUrl: {
    type: String,
    default: "Default about",
  },
  about: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAIw8eCnxpOHP40HWEIiH0p0a0deYskaxX7g&s",
  },
  skills: {
    type: [String],
    min,
  },
});

// model is a class which create its own instances
module.exports = mongoose.model("User", userSchema);
