import express from "express";

import { asyncHandler } from "../middlewares/asyncHandler.js";
import { isLoggedout } from "../middlewares/isLoggedout.js";
import { isLoggedin } from "../middlewares/isLoggedin.js";
import { login, logout, signup } from "../controllers/auth.js";

const router = express.Router();

router.post("/signup", isLoggedout, asyncHandler(signup));
router.post("/login", isLoggedout, asyncHandler(login));
router.post("/logout", isLoggedin, asyncHandler(logout));

export default router;
