import { FiSave } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { useEffect, useState, useRef } from "react";
import { usePost } from "../../context/PostContext";
import { useAuth } from "../../context/AuthContext";

function PostForm() {
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //to clean uploaded file manually
  const fileInputRef = useRef(null);

  const { createPost, editPost, setPostToEdit, postToEdit, setGlobalLoading } =
    usePost();
  const { user } = useAuth();

  //check if a post is in editing mode and set its content in input form
  useEffect(() => {
    if (postToEdit) {
      setContent(postToEdit.content);
      setPostImage(null);
    } else {
      setContent("");
      setPostImage(null);
    }
  }, [postToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!user) {
      setError("sign in first");
      return;
    }
    setLoading(true);
    setGlobalLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("content", content);
      if (postImage) {
        formData.append("postImage", postImage);
      }

      if (postToEdit) {
        await editPost(postToEdit._id, formData);
      } else {
        await createPost(formData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setGlobalLoading(false);
      setContent("");
      setPostImage(null);
      setPostToEdit(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-2xl border p-6 flex flex-col items-center">
          <legend className="fieldset-legend text-lg font-semibold">
            {postToEdit ? "Edit your post" : "Create a post"}
          </legend>
          <div className="w-full flex flex-col gap-4">
            {" "}
            {/* Increased gap */}
            <input
              type="text"
              className="input input-bordered w-full" // Added input-bordered for style
              value={content}
              placeholder="What's on your mind?"
              onChange={(e) => setContent(e.target.value)}
            />
            {/* --- RESPONSIVE CONTAINER --- */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* --- FILE INPUT --- */}
              <fieldset className="fieldset flex flex-col sm:flex-row sm:items-center gap-2 w-full md:w-auto">
                <input
                  ref={fileInputRef}
                  type="file"
                  name="postImage"
                  className="file-input file-input-bordered w-full max-w-xs"
                  onChange={(e) => setPostImage(e.target.files[0])}
                />
                <label className="label">
                  <span className="label-text-alt">Max size 2MB</span>
                </label>
              </fieldset>

              {/* --- ACTION BUTTONS --- */}
              {postToEdit ? (
                <div className="join-item w-full md:w-1/4 flex">
                  <button
                    className="btn btn-primary w-1/2"
                    type="submit"
                    disabled={loading}
                  >
                    <FiSave />
                  </button>
                  <button
                    className="btn btn-ghost w-1/2"
                    type="button"
                    onClick={() => setPostToEdit(null)}
                    disabled={loading}
                  >
                    <ImCross />
                  </button>
                </div>
              ) : (
                <button
                  className="btn btn-primary join-item w-full md:w-1/4"
                  type="submit"
                  disabled={loading}
                >
                  Create
                </button>
              )}
            </div>
          </div>
        </fieldset>
      </form>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
}

export default PostForm;
