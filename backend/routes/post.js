import express from "express"

import { isLoggedin } from "../middlewares/isLoggedin.js"
import { asyncHandler } from "../middlewares/asyncHandler.js"
import {createPost,getAllPosts,getMyPosts} from "../controllers/post.js"

const router = express.Router()

router.post("/create",isLoggedin,asyncHandler(createPost))
router.get("/myposts",isLoggedin,asyncHandler(getMyPosts))
router.get("/allposts",asyncHandler(getAllPosts))

export default router