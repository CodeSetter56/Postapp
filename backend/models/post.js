import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      req:true
    },
    date: {
      type: Date,
      default: Date.now(),
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
    isEdited:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);

export default postModel;
