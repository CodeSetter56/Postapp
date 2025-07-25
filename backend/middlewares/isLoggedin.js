// checks if token is present and valid

import jwt from "jsonwebtoken";

export const isLoggedin = (req, res, next) => {
  if (!req.cookies.token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    // logged in user information can be accessed via req.user
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
