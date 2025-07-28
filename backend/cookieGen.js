//creates a token and sets it as a cookie

import jwt from "jsonwebtoken";

export const cookieGen = (res, user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    //switch http to https when in production
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production"? 'none' : 'strict',
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};
