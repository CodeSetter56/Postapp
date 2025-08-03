import userModel from "../models/user.js";
import postModel from "../models/post.js";
import { UploadOnCloud, DeleteFromCloud } from "../utils/cloudinary.js";

export const createPost = async (req, res) => {
  const { content } = req.body;
  // .file from multer middleware
  const imageLocalPath = req.file?.path;

  if (!content && !imageLocalPath)
    return res
      .status(400)
      .json({ message: "Post must have content or an image." });

  const postData = {
    user: req.user.id, // Correctly use req.user.id
    content: content || "",
  };

  if (imageLocalPath) {
    //pass the file path of the uploaded file to func
    const imgUploadRes = await UploadOnCloud(imageLocalPath);
    if (!imgUploadRes) {
      return res.status(500).json({ message: "Error uploading image." });
    }
     postData.imageUrl = imgUploadRes.url; // Get the URL from Cloudinary
  }

  const post = await postModel.create(postData)

  await userModel.findByIdAndUpdate(req.user.id, {
    $push: { posts: post._id },
  });

  const newPost = await postModel.findById(post._id).populate("user");
  res.status(200).json(newPost);
};

export const getMyPosts = async (req, res) => {
  //find the posts whose user id is = to curr user id and populate it with user info
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
  const post = await postModel.findById(postId);
  const userId = req.user.id;
  const { content } = req.body
  const imageLocalPath = req.file?.path;

  if (!post) {
    return res.status(404).json({ message: "Post not found." });
  }
  if (post.user.toString() !== userId) {
    return res.status(403).json({
      message: "Forbidden: You are not authorized to delete this post.",
    });
  }

  const updatedData = {
    content: content || originalPost.content,
    isEdited: true
  }

  //if new image in temporary storage, delete prev image from cloudinary and set the new image
  //old image's url is directly being passed while the new image's file location is being passed
  if (imageLocalPath) {
    if(post.imageUrl) await DeleteFromCloud(post.imageUrl)
    const newImgUpload = await UploadOnCloud(imageLocalPath);
    if (!newImgUpload) {
      return res.status(500).json({ message: "Error uploading image." });
    }
    //add imageUrl separatly since the user may not upload a new image
    updatedData.imageUrl = newImgUpload.url;
  }

  const updatedPost = await postModel
    .findByIdAndUpdate(
      postId,
      updatedData,
      { new: true, runValidators: true }
    )
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

  if (post.imageUrl) {
    await DeleteFromCloud(post.imageUrl);
  }

  await postModel.findByIdAndDelete(postId);
  await userModel.findByIdAndUpdate(userId, {
    $pull: { posts: postId },
  });

  res.status(200).json({ message: "Post deleted successfully" });
};
