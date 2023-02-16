import React from "react";
import Card from "@mui/material/Card";
import CommentList from "../../components/Comments/CommentList";

const Comments = ({ comments }) => {
  const rootComments = comments[null];
  return (
    <Card sx={{ mt: 2, p: 2 }}>
      <CommentList comments={rootComments} />
    </Card>
  );
};

export default Comments;
