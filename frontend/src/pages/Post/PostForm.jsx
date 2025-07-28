import { useState } from "react";

function PostForm() {

  const [post, setPost] = useState("")

  return (
    <div>
      <form>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-2xl border p-6 flex flex-col items-center">
          <legend className="fieldset-legend text-lg">Create a post</legend>
          <div className="join w-full">
            <input
              type="text"
              className="input join-item w-3/4"
              value={post}
              placeholder="post"
              onChange={(e)=>setPost(e.target.value)}
            />
            <button className="btn join-item w-1/4" type="submit">Create</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default PostForm;
