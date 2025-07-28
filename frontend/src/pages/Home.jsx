
import { useAuth } from "../context/AuthContext";
import PostForm from "./Post/PostForm";
import UserPosts from "./Post/UserPosts";

function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="bg-base-100"></div>;
  }

  return (
    <div>
      {user ? (
        <div className="flex flex-col gap-10 p-10">
          <h1 className="text-7xl text-center">Welcome {user.username}</h1>
          <div className="flex justify-center">
            <PostForm />
          </div>
          <UserPosts />
        </div>
      ) : (
        <div className="text-3xl flex flex-col items-center">
          Welcome user
          <div className="text-sm">login to create posts</div>
        </div>
      )}
    </div>
  );
}

export default Home;
