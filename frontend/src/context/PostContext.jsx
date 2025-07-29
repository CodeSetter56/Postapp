import { createContext, useState, useContext, useEffect } from "react";

export const PostContext = createContext({
  posts: [],
  loading: true,
  mode: "allposts",
  //since it will be used in other pages
  setMode: () => {},
  createPost: async () => {},
  getAllPosts: async () => {},
  getMyPosts: async () => {},
});

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("allposts");

  useEffect(() => {
    if (mode === "myposts") {
      getMyPosts();
    } else if(mode ==="allposts") {
      getAllPosts();
    }
    // render according to mode change
  }, [mode]);

  const createPost = async (postData) => {
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create post");
      }
      //takes the previous array and creates a new clone array with the new data inside
      setPosts((prev) => [data, ...prev]);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getAllPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/post/allposts");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch posts");
      }
      setPosts(data);
    } catch (error) {
      console.error(error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const getMyPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/post/myposts");
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch posts");
      }
      setPosts(data);
    } catch (error) {
      console.error(error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        mode,
        setMode,
        createPost,
        getAllPosts,
        getMyPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};
