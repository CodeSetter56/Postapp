import express from "express"

import { isLoggedin } from "../middlewares/isLoggedin.js"
import { asyncHandler } from "../middlewares/asyncHandler.js"
import { getme } from "../controllers/user.js"

const router = express.Router()

router.get("/me",isLoggedin,asyncHandler(getme))

export default router