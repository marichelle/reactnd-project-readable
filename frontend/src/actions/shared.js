import { fetchCategories } from './categories';
import {
  addPost,
  addVoteToPost,
  deletePost,
  editPost,
  fetchPosts,
} from './posts';
import {
  addPost as addPostAPI,
  addVoteToPost as addVoteToPostAPI,
  deletePost as deletePostAPI,
  editPost as editPostAPI,
  getInitialData,
} from '../utils/api';

export const handleInitialData = () => {
  // redux thunk pattern
  return (dispatch) => {
    return getInitialData().then(({ categories, posts }) => {
      dispatch(fetchCategories(categories));
      dispatch(fetchPosts(posts));
    });
  };
};

export function handleAddPost(post) {
  return (dispatch) => {
    return addPostAPI(post).then((res) => dispatch(addPost(res)));
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

export function handleRemovePost(id) {
  return (dispatch) => {
    return deletePostAPI(id).then(() => dispatch(deletePost(id)));
  };
}
