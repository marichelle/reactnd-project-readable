import {
  ADD_POST,
  ADD_VOTE_TO_POST,
  DELETE_POST,
  EDIT_POST,
  FETCH_POST,
  FETCH_POSTS,
} from '../actions/posts';

export default function posts(posts = [], action) {
  const { payload } = action;

  switch (action.type) {
    case ADD_POST:
      return posts;

    case ADD_VOTE_TO_POST:
      return posts.map((post) =>
        post.id !== payload.id
          ? post
          : {
              ...post,
              voteScore:
                payload.vote === 'upVote'
                  ? post.voteScore + 1
                  : post.voteScore - 1,
            }
      );

    case DELETE_POST:
      return posts;

    case EDIT_POST:
      return posts;

    case FETCH_POST:
      return posts;

    case FETCH_POSTS:
      return [...posts, ...payload];

    default:
      return posts;
  }
}
