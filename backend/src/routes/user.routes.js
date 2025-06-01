const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth.middlewares");
const ConnectionRequest = require("../models/connectionRequest.model");
const { connect } = require("mongoose");
const USER_SAFE_DATA = "firstName lastName photoUrl age about gender skills";
userRouter.get("/user/requests", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate(
      "fromUserId",
      "firstName lastName photoUrl age about gender skills"
    ); // it will fetch the first last name from the user schema
    // populate("fromUserId", ["firstName", "lastName"]);
    res.json({
      message: "Data fetches successfully",
      data: connectionRequest,
    });
  } catch (err) {}
});

userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({ data });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    //User should see all the user cards except
    // his own Card,his connection,ignored people,connection request
    
  } catch (err) {}
});
module.exports = userRouter;

// this willl give you
// _id,fromuserid:{_id,first and last name}
// touserid,status
