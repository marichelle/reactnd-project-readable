export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_POST = 'ADD_POST';
export const ADD_VOTE_TO_COMMENT = 'ADD_VOTE_TO_COMMENT';
export const ADD_VOTE_TO_POST = 'ADD_VOTE_TO_POST';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const EDIT_POST = 'EDIT_POST';
export const FETCH_POSTS = 'FETCH_POSTS';

export const addComment = (comment) => {
  return {
    type: ADD_COMMENT,
    payload: {
      comment,
    },
  };
};

export const addPost = (post) => {
  return {
    type: ADD_POST,
    payload: { post },
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

export const addVoteToPost = (id, vote) => {
  return {
    type: ADD_VOTE_TO_POST,
    payload: {
      id,
      vote,
    },
  };
};

export const deleteComment = (id) => {
  return {
    type: DELETE_COMMENT,
    payload: { id },
  };
};

export const deletePost = (id) => {
  return {
    type: DELETE_POST,
    payload: { id },
  };
};

export const editComment = (id, body) => {
  return {
    type: EDIT_COMMENT,
    payload: {
      id,
      body,
    },
  };
};

export const editPost = (id, post) => {
  return {
    type: EDIT_POST,
    payload: {
      id,
      post,
    },
  };
};

export const fetchPosts = (posts) => {
  return {
    type: FETCH_POSTS,
    payload: { posts },
  };
};
