import express from "express"

import { isLoggedin } from "../middlewares/isLoggedin.js"
import { asyncHandler } from "../middlewares/asyncHandler.js"
import {createPost,DeletePost,EditPost,getAllPosts,getMyPosts, likeCount, likeUnlike} from "../controllers/post.js"

const router = express.Router()

router.get("/allposts",asyncHandler(getAllPosts))
router.get("/myposts",isLoggedin,asyncHandler(getMyPosts))
router.post("/create",isLoggedin,asyncHandler(createPost))
router.get("/likeCount/:id",isLoggedin,asyncHandler(likeCount))
router.put("/likeUnlike/:id",isLoggedin,asyncHandler(likeUnlike))
router.put("/edit/:id",isLoggedin,asyncHandler(EditPost))
router.delete("/delete/:id",isLoggedin,asyncHandler(DeletePost))

export default router 