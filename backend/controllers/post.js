import userModel from "../models/user.js";
import postModel from "../models/post.js";

export const createPost = async (req, res) => {
  const user = await userModel.findById(req.user.id);
  const { content } = req.body;
  if (content === "")
    return res.status(400).json({ message: "enter content" });
  const post = await postModel.create({
    user: user._id,
    content,
  });
  user.posts.push(post._id);
  await user.save();
  //since post.user returns userid as string, populate replaces the string with actual user details
  const newPost = await postModel.findById(post._id).populate("user");
  res.status(200).json(newPost);
};

export const getMyPosts = async (req, res) => {
  const posts = await postModel
    .find({ user: req.user.id })
    .populate("user")
    .sort({ createdAt: -1 });
  res.json(posts);
};

export const getAllPosts = async (req, res) => {
  const posts = await postModel.find().populate("user").sort({ createdAt: -1 });
  res.json(posts);
};

export const likeUnlike = async (req, res) => {
  //since isloggedin already sets the current user, no need to search model
  const userId = req.user.id;
  // route -> "/:id"
  const { id: postId } = req.params;
  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  if (post.likes.includes(userId)) {
    await postModel.updateOne({ _id: postId }, { $pull: { likes: userId } });
    res.status(200).json({ message: "Post unliked successfully" });
  } else {
    await postModel.updateOne(
      { _id: postId },
      //atomic operation. if many users like/unlike at the same time, their actions would not be overwritten
      { $addToSet: { likes: userId } }
    );
    res.status(200).json({ message: "Post liked successfully" });
  }
};

export const likeCount = async (req, res) => {
  const { id: postId } = req.params;
  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const likeCount = post.likes.length;
  res.status(200).json({ likes: likeCount });
};

export const EditPost = async (req, res) => {
  const { id: postId } = req.params;
  const userId = req.user.id;
  const { content } = req.body;
  if (content === "")
    return res.status(400).json({ message: "enter content" });
  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({ message: "Post not found." });
  }
  if (post.user.toString() !== userId) {
    return res.status(403).json({
      message: "Forbidden: You are not authorized to delete this post.",
    });
  }

  const updatedPost = await postModel
    .findByIdAndUpdate(postId, { content,isEdited:true }, { new: true, runValidators: true })
    .populate("user");
  res.status(200).json({
    message: "post edited successfully",
    post: updatedPost,
  });
};

export const DeletePost = async (req, res) => {
  const { id: postId } = req.params;
  const userId = req.user.id;
  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({ message: "Post not found." });
  }
  if (post.user.toString() !== userId) {
    return res.status(403).json({
      message: "Forbidden: You are not authorized to delete this post.",
    });
  }

  await postModel.findByIdAndDelete(postId);
  await userModel.updateOne({ _id: userId }, { $pull: { posts: postId } });

  res.status(200).json({ message: "post deleted successfully" });
};
