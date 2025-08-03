import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isEdited: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String, // To store the URL from Cloudinary
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD_4ORmN_IT3F07pSTZg7oMhmJdqRP4eR7AQ&s",
    },
  },
  { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);

export default postModel;
