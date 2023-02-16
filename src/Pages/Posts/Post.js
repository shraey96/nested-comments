import React, { useRef } from "react";
import { object, number, func } from "prop-types";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import CommentIcon from "@mui/icons-material/Comment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {
  POST_CARD_ACTION_STYLE,
  POST_CARD_MEDIA_STYLE,
  POST_CARD_HEADER_AVATAR_STYLE,
  POST_CARD_HEADER_TITLE_STYLE,
  COMMENTS_COUNT_STYLE,
} from "./styles";
import CommentInput from "../../components/Comments/CommentInput";
import {
  getFormattedTodaysDate,
  getAbbreviatedNumber,
} from "../../utils/generic";

const Post = ({ post, totalCommentsCount, handleCommentAdd }) => {
  const commentInputRef = useRef();
  const focusTextField = () => commentInputRef?.current?.focus();

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={POST_CARD_HEADER_AVATAR_STYLE} aria-label="recipe">
            {post.author?.charAt(0)}
          </Avatar>
        }
        title={
          <Typography
            variant="h6"
            color="inherit"
            sx={POST_CARD_HEADER_TITLE_STYLE}
          >
            {post.title}
          </Typography>
        }
        subheader={getFormattedTodaysDate()}
      />
      <CardMedia
        component="img"
        image={post.img}
        alt="cat-reddit"
        sx={POST_CARD_MEDIA_STYLE}
      />
      <CardActions disableSpacing>
        <Box sx={POST_CARD_ACTION_STYLE}>
          <div>
            <Tooltip title="Add Comment" placement="top">
              <IconButton aria-label="add comment" onClick={focusTextField}>
                <CommentIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Like" placement="top">
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Share" placement="top">
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </Tooltip>
          </div>
          <Typography variant="h6" sx={COMMENTS_COUNT_STYLE}>
            {getAbbreviatedNumber(totalCommentsCount)} Comments
          </Typography>
        </Box>
      </CardActions>
      <CommentInput
        ref={commentInputRef}
        onAddComment={(val) => handleCommentAdd(val, { id: null })}
      />
    </Card>
  );
};

Post.propTypes = {
  post: object,
  totalCommentsCount: number,
  handleCommentAdd: func,
};

Post.defaultProps = {
  post: {},
  handleCommentAdd: () => {},
};

export default Post;
