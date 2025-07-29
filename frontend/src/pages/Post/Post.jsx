import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"

import { MdDelete } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";

function Post({ post }) {
  const navigate = useNavigate()
  const { user } = useAuth();
  // set default like count acc to like array length
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState("");

  const isPostOwner = user && post.user && user._id === post.user._id;

  //runs on render to see if the current user previously liked the post
  useEffect(() => {
    if (user && post.likes) {
      // sets state to true or false by checking if userid is included in likes array
      setIsLiked(post.likes.includes(user._id));
    }
  }, [post.likes, user]);//rerenders on change in likes or the user

  const handleLike = async () => {
    if (!user) {
      navigate("/auth")
      return;
    }
    setError("");

    // Optimistic UI Update: Update the state immediately for a fast UI response.
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount((prev) => prev + 1);
      setIsLiked(true);
    }

    try {
      const res = await fetch(`/api/post/likeUnlike/${post._id}`, {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error("Failed to update like status on the server.");
      }
    } catch (err) {
      setError(err.message);
      // Revert UI on Failure: If the API call fails, revert the state to what it was.
      if (isLiked) {
        setLikeCount((prev) => prev + 1);
        setIsLiked(true);
      } else {
        setLikeCount((prev) => prev - 1);
        setIsLiked(false);
      }
    }
  };

  return (
    <div className="card bg-base-100 w-full shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Post"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">@{post.user?.username}</h2>
        <p>{post.content}</p>
        <div className="card-actions justify-between items-center">
          <div className="flex items-center gap-2">
            <button onClick={handleLike} className="btn btn-ghost btn-sm">
              {isLiked ? (
                <AiFillLike className="text-primary" />
              ) : (
                <AiOutlineLike />
              )}
            </button>
            <span>{likeCount}</span>
          </div>

          {isPostOwner && (
            <div className="flex gap-2">
              <button className="btn btn-secondary btn-sm">
                <FaEdit />
              </button>
              <button className="btn btn-accent btn-sm">
                <MdDelete />
              </button>
            </div>
          )}
        </div>
        {error && <p className="text-error text-xs mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default Post;
