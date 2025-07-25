// returns true if no token is present in cookies

export const isLoggedout = (req, res, next) => {
  if (req.cookies.token) {
    return res.status(401).json({ message: "User already logged in" });
  }
  next();
};
