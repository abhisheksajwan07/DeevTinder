const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.middlewares");
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = user.req;
  res.send(user.firstName + "sent the connection request !");
});
module.exports = requestRouter;
