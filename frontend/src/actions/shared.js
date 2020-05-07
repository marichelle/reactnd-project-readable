import { fetchCategories } from './categories';
import {
  addComment,
  addPost,
  addVoteToComment,
  addVoteToPost,
  deleteComment,
  deletePost,
  editComment,
  editPost,
  fetchPosts,
} from './posts';
import {
  addComment as addCommentAPI,
  addPost as addPostAPI,
  addVoteToComment as addVoteToCommentAPI,
  addVoteToPost as addVoteToPostAPI,
  deleteComment as deleteCommentAPI,
  deletePost as deletePostAPI,
  editComment as editCommentAPI,
  editPost as editPostAPI,
  getInitialData,
} from '../utils/api';

/* INITIAL DATA */

export const handleInitialData = () => {
  // redux thunk pattern
  return (dispatch) => {
    return getInitialData().then(({ categories, posts }) => {
      dispatch(fetchCategories(categories));
      dispatch(fetchPosts(posts));
    });
  };
};

/* POSTS */

export function handleAddPost(post, props) {
  return (dispatch) => {
    return addPostAPI(post).then((res) => {
      // dispatch addPost() action creator
      dispatch(addPost(res));

      // redirect to post detail screen
      props.history.push(`/${res.category}/${res.id}`);
    });
  };
}

export function handleAddVoteToPost(id, vote) {
  return (dispatch) => {
    return addVoteToPostAPI(id, vote).then(() =>
      dispatch(addVoteToPost(id, vote))
    );
  };
}

export function handleEditPost(id, post) {
  return (dispatch) => {
    return editPostAPI(id, post).then(() => dispatch(editPost(id, post)));
  };
}

export function handleDeletePost(id) {
  return (dispatch) => {
    return deletePostAPI(id).then(() => dispatch(deletePost(id)));
  };
}

/* COMMENTS */

export function handleAddComment(comment) {
  return (dispatch) => {
    return addCommentAPI(comment).then((res) => dispatch(addComment(res)));
  };
}

export function handleAddVoteToComment(id, vote) {
  return (dispatch) => {
    return addVoteToCommentAPI(id, vote).then(() =>
      dispatch(addVoteToComment(id, vote))
    );
  };
}

export function handleEditComment(id, comment) {
  return (dispatch) => {
    return editCommentAPI(id, comment).then(() =>
      dispatch(editComment(id, comment))
    );
  };
}

export function handleDeleteComment(id) {
  return (dispatch) => {
    return deleteCommentAPI(id).then(() => dispatch(deleteComment(id)));
  };
}
