import { useState } from "react";
import { usePost } from "../../context/PostContext";
import { useAuth } from "../../context/AuthContext";

function PostForm() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { createPost } = usePost();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("sign in first");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await createPost({ content });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setContent("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-2xl border p-6 flex flex-col items-center">
          <legend className="fieldset-legend text-lg">Create a post</legend>
          <div className="join w-full">
            <input
              type="text"
              className="input join-item w-3/4"
              value={content}
              placeholder="post"
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              className="btn join-item w-1/4"
              type="submit"
              disabled={loading}
            >
              Create
            </button>
          </div>
        </fieldset>
      </form>
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}

export default PostForm;
