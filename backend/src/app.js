import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config(); // Load .env file

const app = express();

// CORS configuration
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
import feedbackRoutes from '../src/routes/feedback.routes.js';


app.use("/api/v1/users", userRouter);
app.use("/api/v1/request", requestRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/feedback", feedbackRoutes);
export { app };
