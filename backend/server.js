import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("MongoDB connected successfully");
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

app.listen(process.env.PORT, () => {
  console.log("Server is running on http://localhost:" + process.env.PORT);
  connectDB();
});
