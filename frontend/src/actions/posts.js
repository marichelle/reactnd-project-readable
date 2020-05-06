export const ADD_POST = 'ADD_POST';
export const ADD_VOTE_TO_POST = 'ADD_VOTE_TO_POST';
export const EDIT_POST = 'EDIT_POST';
export const FETCH_POST = 'FETCH_POST';
export const FETCH_POSTS = 'FETCH_POSTS';
export const DELETE_POST = 'DELETE_POST';

export const addPost = (post) => {
  return {
    type: ADD_POST,
    payload: { post },
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

export const deletePost = (id) => {
  return {
    type: DELETE_POST,
    payload: { id },
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

export const fetchPost = (id) => {
  return {
    type: FETCH_POST,
    payload: { id },
  };
};

export const fetchPosts = (posts) => {
  return {
    type: FETCH_POSTS,
    payload: { posts },
  };
};
