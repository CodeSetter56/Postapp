import express from "express"

import { isLoggedin } from "../middlewares/isLoggedin.js"
import { asyncHandler } from "../middlewares/asyncHandler.js"
import {createPost,getAllPosts,getMyPosts, likeCount, likeUnlike} from "../controllers/post.js"

const router = express.Router()

router.get("/allposts",asyncHandler(getAllPosts))
router.get("/myposts",isLoggedin,asyncHandler(getMyPosts))
router.post("/create",isLoggedin,asyncHandler(createPost))
router.get("/likeCount/:id",isLoggedin,asyncHandler(likeCount))
router.post("/likeUnlike/:id",isLoggedin,asyncHandler(likeUnlike))

export default router