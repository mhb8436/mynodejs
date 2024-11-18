import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

const AddPostForm = ({ onAddPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    onAddPost({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <Stack spacing={2} component="form" onSubmit={handleSubmit}>
      <TextField
        label="title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="content"
        fullWidth
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Stack>
  );
};

export default AddPostForm;
