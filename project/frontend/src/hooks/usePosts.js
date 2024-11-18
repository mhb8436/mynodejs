import { useState, useEffect } from "react";
import { fetchPosts, addPost, deletePost } from "../services/postService";

export const usePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await fetchPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = async (newPost) => {
    try {
      const addedPost = await addPost(newPost);
      setPosts((prevPosts) => [...prevPosts, addedPost]);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return { posts, loading, handleAddPost, handleDeletePost };
};
