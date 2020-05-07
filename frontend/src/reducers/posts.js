import {
  ADD_COMMENT,
  ADD_POST,
  ADD_VOTE_TO_COMMENT,
  ADD_VOTE_TO_POST,
  DELETE_COMMENT,
  DELETE_POST,
  EDIT_COMMENT,
  EDIT_POST,
  FETCH_POSTS,
} from '../actions/posts';

export default function posts(posts = [], action) {
  const { payload } = action;

  switch (action.type) {
    case ADD_COMMENT:
      return posts.map((post) =>
        post.id !== payload.comment.parentId
          ? post
          : {
              ...post,
              commentCount: post.commentCount + 1,
              comments:
                post.comments !== undefined
                  ? post.comments.concat(payload.comment)
                  : [payload.comment],
            }
      );

    case ADD_POST:
      return [...posts].concat(payload.post);

    case ADD_VOTE_TO_COMMENT:
      return posts.map((post) => ({
        ...post,
        comments: post.comments.map((comment) =>
          comment.id !== payload.id
            ? comment
            : {
                ...comment,
                voteScore:
                  payload.vote === 'upVote'
                    ? comment.voteScore + 1
                    : comment.voteScore - 1,
              }
        ),
      }));

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

    case DELETE_COMMENT:
      return posts.map((post) => ({
        ...post,
        comments: post.comments.filter((c) => c.id !== payload.id),
      }));

    case DELETE_POST:
      return posts.filter((post) => post.id !== payload.id);

    case EDIT_COMMENT:
      return posts.map((post) => ({
        ...post,
        comments: post.comments.map((comment) =>
          comment.id !== payload.id
            ? comment
            : {
                ...comment,
                body: payload.body,
              }
        ),
      }));

    case EDIT_POST:
      return posts.map((post) =>
        post.id !== payload.id ? post : { ...post, ...payload.post }
      );

    case FETCH_POSTS:
      return [...posts, ...payload.posts];

    default:
      return posts;
  }
}
