import { FiSave } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { useEffect, useState } from "react";
import { usePost } from "../../context/PostContext";
import { useAuth } from "../../context/AuthContext";

function PostForm() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { createPost, editPost, setPostToEdit, postToEdit } = usePost();
  const { user } = useAuth();

  //check if a post is in editing mode and set it's content in input form
  useEffect(() => {
    if (postToEdit) {
      setContent(postToEdit.content);
    } else {
      setContent("");
    }
  }, [postToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("sign in first");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (postToEdit) {
        await editPost(postToEdit._id, { content });
      } else {
        await createPost({ content });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setContent("");
      setPostToEdit(null);
    }
  };

  const handleCancelEdit = () => {
    setPostToEdit(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-2xl border p-6 flex flex-col items-center">
          <legend className="fieldset-legend text-lg">
            {postToEdit ? "Edit your post" : "Create a post"}
          </legend>
          <div className="join w-full">
            <input
              type="text"
              className="input join-item w-3/4"
              value={content}
              placeholder="post"
              onChange={(e) => setContent(e.target.value)}
            />
            {postToEdit ? (
              <div className="join-item w-1/4 flex">
                <button className="btn w-1/2" type="submit" disabled={loading}>
                  <FiSave />
                </button>
                <button
                  className="btn w-1/2"
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={loading}
                >
                  <ImCross />
                </button>
              </div>
            ) : (
              <button
                className="btn join-item w-1/4"
                type="submit"
                disabled={loading}
              >
                Create
              </button>
            )}
          </div>
        </fieldset>
      </form>
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}

export default PostForm;
