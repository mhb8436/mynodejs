import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  CardActions,
  CardHeader,
} from "@mui/material";
import axiosInstance from "../utils/axiosInstance";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSumbit", email, name);
    regist({ email, name, password });
    navigate("/login");
  };

  const regist = async (data) => {
    try {
      const resp = await axiosInstance.post("/auth/register", data);
      console.log(resp.data);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <Card>
      <Box component="form" onSubmit={handleSubmit}>
        <CardHeader>
          <Typography variant="h4" align="center" gutterBottom>
            회원가입
          </Typography>
        </CardHeader>
        <CardContent>
          <TextField
            label="이메일"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="사용자명"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="비밀번호"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" color="primary">
            회원가입
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default SignUpPage;
