import { createContext, useState, useContext, useEffect } from "react";

export const PostContext = createContext({
  posts: [],
  mode: "allposts",
  //since it will be used in other pages
  setMode: () => {},
  createPost: async () => {},
  getAllPosts: async () => {},
  getMyPosts: async () => {},
  editPost: async () => {},
  deletePost: async () => {},
  //for ui change in postform and disabling actions during editing
  postToEdit: null,
  setPostToEdit: () => {},
});

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [postToEdit, setPostToEdit] = useState(null);
  const [mode, setMode] = useState("allposts");

  useEffect(() => {
    if (mode === "myposts") {
      getMyPosts();
    } else if (mode === "allposts") {
      getAllPosts();
    }
    // render according to mode change
  }, [mode]);

  const createPost = async (postData) => {
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create post");
      //takes the previous array and creates a new clone array with the new data inside
      setPosts((prev) => [data, ...prev]);
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getAllPosts = async () => {
    try {
      const res = await fetch("/api/post/allposts");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch posts");
      setPosts(data);
    } catch (error) {
      console.error(error);
      setPosts([]);
    }
  };

  const getMyPosts = async () => {
    try {
      const res = await fetch("/api/post/myposts");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch posts");
      setPosts(data);
    } catch (error) {
      console.error(error);
      setPosts([]);
    }
  };

  const editPost = async (postId, postData) => {
    try {
      const res = await fetch(`/api/post/edit/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to edit post");

      //response has message and post
      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === postId ? data.post : p))
      );
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deletePost = async (postId) => {
    try {
      const res = await fetch(`/api/post/delete/${postId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete post");
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        mode,
        setMode,
        createPost,
        getAllPosts,
        getMyPosts,
        editPost,
        deletePost,
        postToEdit,
        setPostToEdit,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};
