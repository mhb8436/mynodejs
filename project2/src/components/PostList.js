import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Typography, Box } from "@mui/material";

const PostList = ({ posts, onDeletePost }) => {
  // Data Grid에 필요한 columns 정의
  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1, // 반응형 크기 조정
      renderHeader: () => (
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          Title
        </Typography>
      ),
    },
    {
      field: "content",
      headerName: "Content",
      flex: 2,
      renderHeader: () => (
        <Typography variant="h6" style={{ fontWeight: "bold" }}>
          Content
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          color="secondary"
          variant="contained"
          onClick={() => onDeletePost(params.row.id)}
        >
          Delete
        </Button>
      ),
      sortable: false, // 정렬 비활성화
      filterable: false, // 필터 비활성화
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={posts} // rows는 데이터 배열
        columns={columns} // columns는 정의된 열
        pageSize={5} // 페이지당 항목 수
        rowsPerPageOptions={[5, 10, 20]} // 선택 가능한 페이지 크기
        disableSelectionOnClick // 셀 클릭 시 선택 비활성화
        autoHeight // 컨테이너 크기에 맞게 동적으로 높이 조정
      />
    </Box>
  );
};

export default PostList;
