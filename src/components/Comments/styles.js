export const COMMENT_INPUT_STYLE = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  p: 2,
};

export const COMMENT_BUTTON_STYLE = { mt: 2 };

export const COMMENT_TIME_STYLE = {
  ml: 1.5,
  color: (theme) => theme.palette.grey[600],
};

export const COMMENT_EDITED_STYLE = {
  ml: 1,
  fontStyle: "italic",
  color: (theme) => theme.palette.grey[400],
};

export const COMMENT_ACTION_BUTTONS_CONTAINER_STYLE = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
};

export const COMMENT_CARD_STYLE = {
  boxShadow: "none",
  border: 1,
  p: 1,
  borderColor: (theme) => theme.palette.primary.light,
};

export const COMMENT_REPLIES_BOX_STYLE = { pl: 2.5, width: "100%" };

export const FLEX_BASE_STYLE = {
  display: "flex",
};

export const FLEX_ALIGN_START = {
  ...FLEX_BASE_STYLE,
  alignItems: "flex-start",
};

export const FLEX_ALIGN_CENTER = {
  ...FLEX_BASE_STYLE,
  alignItems: "center",
};
