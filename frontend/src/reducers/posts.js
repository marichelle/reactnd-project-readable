import {
  ADD_POST,
  ADD_VOTE_TO_POST,
  EDIT_POST,
  FETCH_POST,
  FETCH_POSTS,
  DELETE_POST,
} from '../actions/posts';

export default function posts(posts = [], action) {
  const { payload } = action;

  switch (action.type) {
    case ADD_POST:
      return [...posts].concat(payload.post);

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
      return posts.filter((post) => post.id !== payload.id);

    case EDIT_POST:
      return posts.map((p) =>
        p.id !== payload.id ? p : { ...p, ...payload.post }
      );

    case FETCH_POST:
      return posts;

    case FETCH_POSTS:
      return [...posts, ...payload.posts];

    default:
      return posts;
  }
}
