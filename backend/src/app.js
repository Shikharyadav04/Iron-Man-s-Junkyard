import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { ApiError } from "../src/utils/ApiError.js"; // Adjust this path accordingly
import multer from "multer";
dotenv.config(); // Load .env file
import Razorpay from "razorpay";
import * as crypto from "crypto";


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

// Importing and setting up routes
import userRouter from "./routes/user.routes.js";
import requestRouter from "../src/routes/request.routes.js";
import adminRouter from "../src/routes/admin.routes.js";
import feedbackRouter from "../src/routes/feedback.routes.js";
import dealerRouter from "../src/routes/dealer.routes.js";
import paymentRouter from "../src/routes/payment.routes.js";
import newsRouter from "../src/routes/news.routes.js";
import tweetRouter from "../src/routes/tweet.routes.js";
import chatRouter from "../src/routes/chat.routes.js";
import notificationRouter from "./routes/notification.routes.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/request", requestRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/feedback", feedbackRouter);
app.use("/api/v1/dealers", dealerRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/tweet", tweetRouter);
app.use("/api/v1/chat", chatRouter);
// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err); // Log the full error to see what went wrong
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }
  next(err);
  // Handle other types of errors (optional)
  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

app.post("/order", async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = req.body;
    const order = await razorpay.orders.create(options);

    if (!order) {
      return res.status(500).send("Error");
    }

    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.post("/order/validate", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  //order_id + "|" + razorpay_payment_id
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  res.json({
    msg: "success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
});
// Use the error handling middleware
app.use(errorHandler);

// Export the app
export { app };
