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

  //check if a post is in editing mode and set it's content in input form
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
    //start a global loading when a post has started being created or edited
    setGlobalLoading(true);
    setError(null);

    try {
      if (postToEdit) {
        //an object that contains all the user input data to pass to context func
        const formData = new FormData();
        formData.append("content", content);
        if (postImage) {
          formData.append("postImage", postImage);
        }
        await editPost(postToEdit._id, formData);
      } else {
        const formData = new FormData();
        formData.append("content", content);
        if (postImage) {
          formData.append("postImage", postImage);
        }
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
      //removes uploaded file from input
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-2xl border p-6 flex flex-col items-center">
          <legend className="fieldset-legend text-lg">
            {postToEdit ? "Edit your post" : "Create a post"}
          </legend>

          <div className="w-full flex flex-col gap-2">
            <input
              type="text"
              className="input w-full"
              value={content}
              placeholder="post"
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <fieldset className="fieldset flex">
                <input
                  ref={fileInputRef}
                  type="file"
                  name="postImage"
                  className="file-input"
                  onChange={(e) => setPostImage(e.target.files[0])}
                />
                <label className="label">Max size 2MB</label>
              </fieldset>

              {postToEdit ? (
                <div className="join-item w-1/4 flex">
                  <button
                    className="btn w-1/2"
                    type="submit"
                    disabled={loading}
                  >
                    <FiSave />
                  </button>
                  <button
                    className="btn w-1/2"
                    type="button"
                    onClick={() => setPostToEdit(null)}
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
          </div>
        </fieldset>
      </form>
      {error && <div className="text-red-600">{error}</div>}
    </div>
  );
}

export default PostForm;
