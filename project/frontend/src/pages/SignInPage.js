import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login({ email, password });
    console.log("login", user);
    navigate("/");
  };

  return (
    <Card>
      <Box component="form" onSubmit={handleSubmit}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            로그인
          </Typography>

          <TextField
            label="이메일"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="비밀번호"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
        </CardContent>
        <CardActions>
          <Button type="submit" variant="contained" color="primary">
            로그인
          </Button>
          <Link to={"/signup"}>
            <Typography variant="h6">회원가입</Typography>
          </Link>
        </CardActions>
      </Box>
    </Card>
  );
};

export default SignInPage;
