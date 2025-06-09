const express = require("express");
const requestRouter = express.Router();
const User = require("../models/user.model");
const { userAuth } = require("../middlewares/auth.middlewares");
const ConnectionRequest = require("../models/connectionRequest.model");
const sendEmail = require("../utils/sendEmail");
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const user = req.user;
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid status type: " + status,
        });
      }
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      //if there is an existing ConnectionRequest
      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res.status(400).send({ message: "request already exist!" });
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      const emailRes = await sendEmail.run();
      console.log(emailRes)
      res.status(200).json({
        message: user.firstName + " is " + status + " in " + toUser.firstName,
        data,
        success: true,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  }
);
requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const loggedUser = req.user;
      const { status, requestId } = req.params;
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Status Not Allowed",
        });
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestId,
        toUserId: loggedUser._id,
        status: "interested",
      });
      if (!connectionRequest) {
        return res.status(404).json({
          message: "Connection request not found",
        });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      return res.status(200).json({
        message: `Request ${status} successfully`,
        data: data,
      });
    } catch (err) {
      console.error("Error in reviewing request:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
module.exports = requestRouter;
