import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Comments from "./Comments";
import Post from "./Post";
import { POST_PAGE_STYLE, POST_BOX_STYLE } from "./styles";
import {
  addComment,
  deleteComment,
  editComment,
  getTotalCommentsCount,
  getSortedCommentsForStorage,
  getAppStateData,
} from "../../utils/comments";
import { getRandomItem, setValueToLocalStorage } from "../../utils/generic";
import { AUTHOR_NAMES_LIST } from "../../constants";
import CommentsContext from "../../contexts/commentsContext";
import useeEventListener from "../../hooks/useEventListener";

const Posts = () => {
  const [postPayload, setPostPayload] = useState(getAppStateData());

  const handleSaveToStorageComments = () => {
    const arrayCommentsToStore = getSortedCommentsForStorage(
      postPayload.comments
    );
    setValueToLocalStorage("localComments", arrayCommentsToStore);
  };

  useeEventListener({
    ref: window,
    eventName: "beforeunload",
    callback: handleSaveToStorageComments,
  });

  const handleCommentAdd = (text, comment) => {
    const commentPayload = {
      ...getRandomItem(AUTHOR_NAMES_LIST),
      created: Math.floor(Date.now() / 1000),
      id: `id_${Date.now()}`,
      parentId: comment.id,
      text,
    };
    const updatedComments = addComment(commentPayload, postPayload.comments);
    setPostPayload((prevPayload) => ({
      ...prevPayload,
      comments: updatedComments,
    }));
  };

  const handleCommentDelete = (comment) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the post?"
    );
    if (confirmDelete) {
      const updatedComments = deleteComment(comment, postPayload.comments);
      setPostPayload((prevPayload) => ({
        ...prevPayload,
        comments: updatedComments,
      }));
    }
  };

  const handleCommentEdit = (text, comment) => {
    const updatedComments = editComment(
      { ...comment, text },
      postPayload.comments
    );
    setPostPayload((prevPayload) => ({
      ...prevPayload,
      comments: updatedComments,
    }));
  };

  const contextValues = {
    groupedCommentsByParentId: postPayload.comments,
    handleCommentAdd,
    handleCommentDelete,
    handleCommentEdit,
  };

  const totalComments = useMemo(
    () => getTotalCommentsCount(postPayload.comments),
    [postPayload.comments]
  );

  return (
    <Card sx={POST_PAGE_STYLE}>
      <Box sx={POST_BOX_STYLE}>
        <Post
          post={postPayload.post}
          totalCommentsCount={totalComments}
          handleCommentAdd={handleCommentAdd}
        />
        <CommentsContext.Provider value={contextValues}>
          <Comments comments={postPayload.comments} />
        </CommentsContext.Provider>
      </Box>
    </Card>
  );
};

export default Posts;
