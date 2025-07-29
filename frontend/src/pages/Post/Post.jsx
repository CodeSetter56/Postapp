import { AiFillLike } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { useAuth } from "../../context/AuthContext";

function Post({ post }) {
  const { user } = useAuth();
  const isPostOwner = user && user._id === post.user._id;

  return (
    <div>
      <div className="card bg-base-100 w-full shadow-sm">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{post.user.username}</h2>
          <p>{post.content}</p>
          <div className="card-actions justify-between">
            <button className="btn btn-primary">
              <AiFillLike />
            </button>
            {isPostOwner && (
              <div className="flex gap-2">
                <button className="btn btn-primary">
                  <FaEdit />
                </button>
                <button className="btn btn-primary">
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
