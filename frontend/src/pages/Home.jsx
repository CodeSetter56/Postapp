import { useAuth } from "../context/AuthContext";
import PostForm from "./Post/PostForm";
import UserPosts from "./Post/UserPosts"

function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="bg-base-100 min-h-screen"></div>;
  }

  return (
    <div>
      {user ? (
        <div className="flex flex-col gap-10 p-4 md:p-10">
          <h1 className="text-4xl md:text-7xl text-center font-bold">
            Welcome, {user.username}
          </h1>
          <div className="flex justify-center">
            <PostForm />
          </div>
          <div className="flex justify-center">
            <UserPosts />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10 p-4 md:p-10">
          <h1 className="text-4xl text-center md:text-7xl font-bold">
            Welcome, Guest
          </h1>
          <p className="text-lg text-center text-gray-400">
            Please log in to create and see posts.
          </p>
          <UserPosts />
        </div>
      )}
    </div>
  );
}

export default Home;
