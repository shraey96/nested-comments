import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { string, bool, func } from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  COMMENT_INPUT_STYLE,
  COMMENT_BUTTON_STYLE,
  COMMENT_ACTION_BUTTONS_CONTAINER_STYLE,
} from "./styles";
import { isEmpty } from "../../utils/generic";

const CommentInput = forwardRef(
  (
    {
      initialValue,
      onChange,
      onAddComment,
      onCloseCommentBox,
      withCloseCommentBox,
      autoFocus,
      isEditMode,
    },
    ref
  ) => {
    const [val, setVal] = useState(initialValue);
    const textInputRef = useRef();

    const handleCommentAdd = () => {
      onAddComment(val);
      setVal("");
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          focus() {
            textInputRef.current.focus();
          },
        };
      },
      []
    );

    return (
      <Box component="div" sx={COMMENT_INPUT_STYLE}>
        <TextField
          label="Comment"
          placeholder="Add a comment"
          multiline
          minRows={5}
          value={val}
          autoFocus={autoFocus}
          onChange={(e) => {
            setVal(e.target.value);
            onChange(e);
          }}
          fullWidth
          inputRef={(ref) => {
            textInputRef.current = ref;
          }}
        />
        <Box sx={COMMENT_ACTION_BUTTONS_CONTAINER_STYLE}>
          <Button
            sx={COMMENT_BUTTON_STYLE}
            variant="contained"
            disabled={
              isEditMode ? isEmpty(val) || val === initialValue : isEmpty(val)
            }
            onClick={handleCommentAdd}
          >
            {isEditMode ? "Edit" : "Add"}
          </Button>
          {withCloseCommentBox ? (
            <Button
              sx={COMMENT_BUTTON_STYLE}
              color="error"
              variant="outlined"
              onClick={onCloseCommentBox}
            >
              Close
            </Button>
          ) : null}
        </Box>
      </Box>
    );
  }
);

CommentInput.propTypes = {
  initialValue: string,
  onChange: func,
  onAddComment: func,
  onCloseCommentBox: func,
  withCloseCommentBox: bool,
  isEditMode: bool,
};

CommentInput.defaultProps = {
  initialValue: "",
  onChange: () => {},
  onAddComment: () => {},
  onCloseCommentBox: () => {},
  withCloseCommentBox: false,
  autoFocus: false,
  isEditMode: false,
};

export default CommentInput;
