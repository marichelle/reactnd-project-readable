import {
  ADD_POST,
  ADD_VOTE_TO_POST,
  DELETE_POST,
  EDIT_POST,
  FETCH_POST,
  FETCH_POSTS,
} from '../actions/posts';

export default function posts(state = [], action) {
  switch (action.type) {
    case ADD_POST:
      return state;

    case ADD_VOTE_TO_POST:
      return state;

    case DELETE_POST:
      return state;

    case EDIT_POST:
      return state;

    case FETCH_POST:
      return state;

    case FETCH_POSTS:
      return [...state, ...action.payload];

    default:
      return state;
  }
}
