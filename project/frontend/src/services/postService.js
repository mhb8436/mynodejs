import axiosInstance from "../utils/axiosInstance";

export const fetchPosts = async (accessToken) => {
  const response = await axiosInstance.get("/posts", {
    // headers: { Authorization: `bearer ${accessToken}` },
  });
  return response.data.data;
};

export const addPost = async (newPost, accessToken) => {
  const response = await axiosInstance.post("/posts", newPost, {
    // headers: { Authorization: `bearer ${accessToken}` },
  });
  return response.data.data;
};

export const deletePost = async (id, accessToken) => {
  await axiosInstance.delete(`/posts/${id}`, {
    // headers: { Authorization: `bearer ${accessToken}` },
  });
};
