const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database.js");
const cors = require("cors");
const http = require("http");
const cookieParser = require("cookie-parser");
require("./utils/cronJob.js");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://deev-tinder.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.routes.js");
const profileRouter = require("./routes/profile.routes.js");
const requestRouter = require("./routes/requests.routes.js");
const userRouter = require("./routes/user.routes.js");
const paymentRouter = require("./routes/payment.routes.js");
const chatRouter = require("./routes/chats.routes.js");
const initializeSocket = require("./utils/sockets.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);

const port = process.env.PORT || 3000;
const server = http.createServer(app);
initializeSocket(server);

connectDB()
  .then(() => {
    console.log("Database connected");
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.error("Database connection error:", err.message));