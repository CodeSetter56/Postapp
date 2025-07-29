import userModel from "../models/user.js";
import postModel from "../models/post.js";

export const createPost = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  const { content } = req.body;
  const post = await postModel.create({
    user: user._id,
    content,
  });
  user.posts.push(post._id);
  await user.save();
  //since post.user returns userid as string, populate replaces the string with actual user details
  const newPost = await postModel.findById(post._id).populate("user");
  res.json(newPost);
};

export const getMyPosts = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  const posts = await postModel
    .find({ user: user._id })
    .populate("user")
    .sort({ createdAt: -1 });
  res.json(posts);
};

export const getAllPosts = async (req, res) => {
  const posts = await postModel
    .find()
    .populate("user")
    .sort({ createdAt: -1 });
  res.json(posts);
};
