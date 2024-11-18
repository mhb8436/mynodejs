import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PostList from "../components/PostList";
import AddPostForm from "../components/AddPostForm";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Button,
  Typography,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
// import axiosInstance from "../utils/axisInstance";
import { usePosts } from "../hooks/usePosts";

const HomePage = () => {
  const { user, logout } = useAuth();
  const { posts, loading, handleAddPost, handleDeletePost } = usePosts();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);
  // const [posts, setPosts] = useState([
  //   {
  //     id: 1,
  //     title: "첫 번째 게시글",
  //     content: "React와 MUI로 게시판을 만들어 봅시다!",
  //   },
  //   {
  //     id: 2,
  //     title: "두 번째 게시글",
  //     content: "MUI는 UI 구성이 정말 간단합니다.",
  //   },
  // ]);
  // const fetchPosts = async () => {
  //   try {
  //     // console.log("fetchPost", user);
  //     const response = await axiosInstance.get("/posts", {
  //       headers: { Authorization: `bearer ${user.accessToken}` },
  //     });
  //     // console.log(response.data.data);
  //     setPosts(response.data.data); // 처음 10개의 게시글만 가져오기
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching posts:", error);
  //     setLoading(false);
  //   }
  // };

  // const addPost = async (newPost) => {
  //   try {
  //     console.log("addPost", newPost, user.accessToken);
  //     const response = await axiosInstance.post("/posts", newPost);
  //     console.log("addPost result => ", response);
  //     setPosts([...posts, response.data.data]);
  //   } catch (error) {
  //     console.error("Error adding post:", error);
  //   }
  // };

  // const deletePost = async (id) => {
  //   try {
  //     await axiosInstance.delete(`/posts/${id}`, {
  //       headers: { Authorization: `bearer ${user.accessToken}` },
  //     });
  //     setPosts(posts.filter((post) => post.id !== id));
  //   } catch (error) {
  //     console.error("Error deleting post:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (user) {
  //     fetchPosts();
  //   }
  // }, [user]);

  console.log(!user);
  if (!user) {
    navigate("/login");
    return;
  }
  return (
    <Container>
      <>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              ></IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                안녕하세요, {user.user.email}님!
              </Typography>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Card variant="outlined" sx={{ p: 1, m: 5 }}>
          <CardHeader>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              로딩 중...
            </Typography>
          </CardHeader>
          <CardContent>
            <AddPostForm onAddPost={handleAddPost} />
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ p: 1, m: 5 }}>
          <CardHeader>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              로딩 중...
            </Typography>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Typography align="center">로딩 중...</Typography>
            ) : (
              <PostList posts={posts} onDeletePost={handleDeletePost} />
            )}
          </CardContent>
        </Card>
      </>
    </Container>
  );
};

export default HomePage;
