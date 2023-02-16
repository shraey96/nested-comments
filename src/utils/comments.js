import { getValueFromLocalStorage, deepClone } from "./generic";
import { POST_AND_COMMENTS_PAYLOAD } from "../constants";
/**
 * @function getCommentsGroupedByParentId
 * @param {array} comments
 *
 * @description Groups comments by parentId
 * @returns {object}
 */
export const getCommentsGroupedByParentId = (comments = []) => {
  return comments.reduce((acc, curr) => {
    if (!acc[curr.parentId]) {
      acc[curr.parentId] = [];
    }
    acc[curr.parentId].push(curr);
    return acc;
  }, {});
};

/**
 * @function getCommentsGroupedByParentId
 * @param {string} commentId
 * @param {object} comments
 *
 * @description Returns comment replies for a particualr commentId, from the groupedByParentId comment object
 * @returns {array}
 */
export const getCommentReplies = (commentId, comments = {}) => {
  return comments[commentId];
};

/**
 * @function getTotalCommentsCount
 * @param {array} comments
 *
 * @description Returns total number of comments for the post
 * @returns {number}
 */
export const getTotalCommentsCount = (comments = {}) => {
  return Object.values(comments).reduce((acc, curr) => acc + curr.length, 0);
};

/**
 * @function addComment
 * @param {object} comment
 * @param {object} groupedComments
 *
 * @description Performs add operation based on parentId on groupedComments object (cloned) and returns it
 * @returns {object}
 */
export const addComment = (comment = {}, groupedComments = {}) => {
  const groupedCommentsClone = { ...groupedComments };
  if (!groupedCommentsClone[comment.parentId]) {
    groupedCommentsClone[comment.parentId] = [comment];
  } else {
    groupedCommentsClone[comment.parentId] = [
      comment,
      ...groupedCommentsClone[comment.parentId],
    ];
  }

  return groupedCommentsClone;
};

/**
 * @function deleteComment
 * @param {object} comment
 * @param {object} groupedComments
 *
 * @description Performs delete operation based on parentId on groupedComments object (cloned) and returns it
 * @returns {object}
 */
export const deleteComment = (comment = {}, groupedComments = {}) => {
  const groupedCommentsClone = { ...groupedComments };

  // remove that particular comment from the list
  groupedCommentsClone[comment.parentId] = groupedCommentsClone[
    comment.parentId
  ]?.filter((cmt) => cmt.id !== comment.id);

  let idsToDelete = [comment.id];

  // finds ids to delete n children of that comment, recursively
  function getIdsToDelete(commentsArr = []) {
    let nestedIdsToDelete = [];
    commentsArr.forEach((cmt) => {
      nestedIdsToDelete.push(cmt.id);
      if (groupedCommentsClone[cmt.id]) {
        nestedIdsToDelete = [
          ...nestedIdsToDelete,
          ...getIdsToDelete(groupedCommentsClone[cmt.id]),
        ];
      }
    });
    return nestedIdsToDelete;
  }

  idsToDelete = [
    ...idsToDelete,
    ...getIdsToDelete(groupedCommentsClone[comment.id]),
  ];

  idsToDelete.forEach((id) => {
    delete groupedCommentsClone[id];
  });

  return groupedCommentsClone;
};

/**
 * @function editComment
 * @param {object} comment
 * @param {object} groupedComments
 *
 * @description Performs edit operation based on parentId on groupedComments object (cloned) and returns it
 * @returns {object}
 */
export const editComment = (comment = {}, groupedComments = {}) => {
  const groupedCommentsClone = { ...groupedComments };
  const indexOfComment = groupedCommentsClone[comment.parentId].findIndex(
    (cmt) => cmt.id === comment.id
  );
  if (indexOfComment > -1) {
    groupedCommentsClone[comment.parentId][indexOfComment] = {
      ...comment,
      edited: true,
    };
  }
  return groupedCommentsClone;
};

/**
 * @function getSortedCommentsForStorage
 * @param {object} comments
 *
 * @description Returns comments sorted by created (descending) from groupedCommentsByParentId in array form (used to write in localstorage)
 * @returns {array}
 */
export const getSortedCommentsForStorage = (comments = {}) => {
  return Object.values({ ...comments })
    .flat()
    .sort((a, b) => b.created - a.created);
};

/**
 * @function getAppStateData
 *
 * @description Returns formatted payload (post + comments) from base constant file + localStorage
 * @returns {object}
 */
export const getAppStateData = () => {
  const commentsFromLocalStorage = getValueFromLocalStorage("localComments");
  const clonedData = commentsFromLocalStorage
    ? { ...POST_AND_COMMENTS_PAYLOAD.data, comments: commentsFromLocalStorage }
    : deepClone(POST_AND_COMMENTS_PAYLOAD.data);
  clonedData.comments = getCommentsGroupedByParentId(clonedData.comments);
  return clonedData;
};
