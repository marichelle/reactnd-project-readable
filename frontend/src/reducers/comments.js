import {
  ADD_COMMENT,
  ADD_VOTE_TO_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  FETCH_COMMENT,
  FETCH_COMMENTS,
} from '../actions/comments';

export default function comments(state = [], action) {
  switch (action.type) {
    case ADD_COMMENT:
      return state;

    case ADD_VOTE_TO_COMMENT:
      return state;

    case DELETE_COMMENT:
      return state;

    case EDIT_COMMENT:
      return state;

    case FETCH_COMMENT:
      return state;

    case FETCH_COMMENTS:
      return [...state, ...action.payload];

    default:
      return state;
  }
}
