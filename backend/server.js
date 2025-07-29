import cookieParser from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)

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
