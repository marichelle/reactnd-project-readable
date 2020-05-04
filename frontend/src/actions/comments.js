export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_VOTE_TO_COMMENT = 'ADD_VOTE_TO_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const FETCH_COMMENT = 'FETCH_COMMENT';
export const FETCH_COMMENTS = 'FETCH_COMMENTS';

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: comment,
  };
};

export const addVoteToComment = (id, vote) => {
  return {
    type: ADD_VOTE_TO_COMMENT,
    payload: {
      id,
      vote,
    },
  };
};

export const deleteComment = (id) => {
  return {
    type: DELETE_COMMENT,
    payload: id,
  };
};

export const editComment = (comment) => {
  return {
    type: EDIT_COMMENT,
    payload: comment,
  };
};

export const fetchComment = (id) => {
  return {
    type: FETCH_COMMENT,
    payload: id,
  };
};

export const fetchComments = (comments) => {
  return {
    type: FETCH_COMMENTS,
    payload: comments,
  };
};
