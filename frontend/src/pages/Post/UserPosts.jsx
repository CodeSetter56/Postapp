import { usePost } from "../../context/PostContext"; 
import Post from "./Post";

function UserPosts() {
  const { posts, loading, mode, setMode } = usePost();

  const handleMode = (e) => {
    e.preventDefault();
    if (e.target.value !== mode) {
      setMode(e.target.value);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-40">
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-start gap-4">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-2xl font-bold">Posts</h2>
        <div className="flex gap-3">
          <button
            className={`btn ${
              mode === "allposts" ? "btn-ghost" : "btn-primary"
            }`}
            onClick={handleMode}
            value="allposts"
          >
            All Posts
          </button>
          <button
            className={`btn ${
              mode === "myposts" ?  "btn-ghost" : "btn-primary" 
            }`}
            onClick={handleMode}
            value="myposts"
          >
            My Posts
          </button>
        </div>
      </div>

      {posts.length > 0 ? (
        <div className="w-full mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            // pass the whole post data as prop
            <Post key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <p className="w-full text-center text-sm text-gray-500 mt-4">
          {mode === "myposts"
            ? "You don't have any posts yet."
            : "No posts found."}
        </p>
      )}
    </div>
  );
}

export default UserPosts;
