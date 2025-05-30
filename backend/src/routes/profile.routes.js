const express = require("express");
const profileRouter = express.Router();
const validateEditProfileData = require("../utils/validations");
const { userAuth } = require("../middlewares/auth.middlewares");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedUser = req.user;``
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;
//   const ALLOWED_UPDATES = [
//     "photoURL",
//     "about",
//     "gender",
//     "skills",
//     "firstName",
//     "lastName",
//     "age",
//   ];

//   try {
//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(data)
//     );
//     if (!isUpdateAllowed) {
//       throw new Error("update not allowed");
//     }
//     if (data?.skills.length > 10) {
//       throw new Error("skills cant be more than 10");
//     }
//     const user = await User.findByIdUpdate({ _id: userId }, data, {
//       returnDocument: "after",
//       runValidators: true,
//     });
//     res.send("user updated succesfully");
//   } catch (err) {
//     res.status(400).send("Updaate Failed:" + err.message);
//   }
// });

module.exports = profileRouter;
