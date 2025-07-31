import bcrypt from "bcryptjs";

import { cookieGen } from "../cookieGen.js";
import userModel from "../models/user.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (await userModel.findOne({ email })) {
    return res.status(400).json({ message: "User already exists" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
  const hashedPass = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({
    username,
    email,
    password: hashedPass,
  });
  cookieGen(res, newUser);
  const removePassUser = newUser.toObject();
  delete removePassUser.password;
  res.json(removePassUser);
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "email doesn't exist" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  cookieGen(res, user);
  const removePassUser = user.toObject();
  delete removePassUser.password;
  res.json(removePassUser);
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User logged out successfully" });
};
