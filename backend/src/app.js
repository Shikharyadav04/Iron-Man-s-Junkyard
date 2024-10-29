import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// using cors middleware

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// using express.json and express.urlencoded middleware to parse request body and cookies
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:8000", // Replace with your frontend URL
    credentials: true,
  })
);

// importing routes
import userRouter from "./routes/user.routes.js";

//route declaration
app.use("/api/v1/users", userRouter);

export { app };
