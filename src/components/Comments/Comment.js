import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import {
  COMMENT_CARD_STYLE,
  COMMENT_REPLIES_BOX_STYLE,
  COMMENT_TIME_STYLE,
  COMMENT_EDITED_STYLE,
  FLEX_BASE_STYLE,
  FLEX_ALIGN_START,
  FLEX_ALIGN_CENTER,
} from "./styles";
import { getTimeAgoString } from "../../utils/generic";
import CommentsContext from "../../contexts/commentsContext";

const Comment = ({ comment }) => {
  const [isReplyBoxOpen, toggleIsReplyBoxOpen] = useState(false);
  const {
    groupedCommentsByParentId,
    handleCommentAdd,
    handleCommentDelete,
    handleCommentEdit,
  } = useContext(CommentsContext);
  const commentReplies = groupedCommentsByParentId[comment.id];
  const isCommentInputEditMode = isReplyBoxOpen === "EDIT";
  return (
    <>
      <Card
        sx={{
          ...COMMENT_CARD_STYLE,
          mt: !comment.parentId ? 5 : 2,
        }}
      >
        <Box sx={FLEX_ALIGN_START}>
          <img
            src={comment.profileImage}
            alt={comment.author}
            className="comment-author-img"
            loading="lazy"
          />
          <Box sx={{ ml: 2 }}>
            <Box sx={FLEX_ALIGN_CENTER}>
              <Typography variant="h6">{comment.author}</Typography>
              <Typography variant="p" sx={COMMENT_TIME_STYLE}>
                {getTimeAgoString(comment.created)}
              </Typography>
              {comment.edited ? (
                <Typography sx={COMMENT_EDITED_STYLE}>• edited</Typography>
              ) : null}
            </Box>
            <Typography variant="p">{comment.text}</Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                size="small"
                color="success"
                variant="outlined"
                onClick={() =>
                  toggleIsReplyBoxOpen((prevOpen) =>
                    prevOpen ? false : "EDIT"
                  )
                }
              >
                Edit
              </Button>
              <Button
                size="small"
                color="info"
                variant="outlined"
                sx={{ ml: 1 }}
                onClick={() =>
                  toggleIsReplyBoxOpen((prevOpen) =>
                    prevOpen ? false : "REPLY"
                  )
                }
              >
                Reply
              </Button>
              <Button
                size="small"
                color="error"
                variant="outlined"
                sx={{ ml: 1 }}
                onClick={() => handleCommentDelete(comment)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
        {isReplyBoxOpen ? (
          <Box sx={{ ml: 2 }}>
            <CommentInput
              autoFocus
              initialValue={isCommentInputEditMode ? comment.text : ""}
              isEditMode={isCommentInputEditMode}
              withCloseCommentBox
              onCloseCommentBox={() => toggleIsReplyBoxOpen(false)}
              onAddComment={(val) => {
                if (isCommentInputEditMode) {
                  handleCommentEdit(val, comment);
                } else {
                  handleCommentAdd(val, comment);
                }

                toggleIsReplyBoxOpen(false);
              }}
            />
          </Box>
        ) : null}
      </Card>
      {commentReplies ? (
        <Box sx={FLEX_BASE_STYLE}>
          <Divider sx={{ mt: 0.5 }} orientation="vertical" flexItem />
          <Box sx={COMMENT_REPLIES_BOX_STYLE}>
            <CommentList
              comments={commentReplies}
              groupedCommentList={groupedCommentsByParentId}
            />
          </Box>
        </Box>
      ) : null}
    </>
  );
};

export default Comment;
