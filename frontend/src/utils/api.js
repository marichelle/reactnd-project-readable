import { generateUID } from './helper';

const api = 'http://localhost:3001';

// Generate a unique token for storing your bookshelf data on the backend server.
const token = localStorage.token
  ? localStorage.token
  : Math.random().toString(36).substr(-8);

const headers = {
  Accept: 'application/json',
  Authorization: token,
};

export const getInitialData = async () => {
  const categories = await getAllCategories();
  const posts = await getAllPostsWithComments();

  return {
    categories,
    posts,
  };
};

const getAllPostsWithComments = async () => {
  const posts = await getAllPosts();

  const postsWithComments = posts.map(async (post) => ({
    ...post,
    comments: await getComments(post.id),
  }));

  return Promise.all(postsWithComments);
};

// GET /categories
export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then((res) => res.json()) // Transform the data into JSON
    .then((data) => data.categories); // Return the response

// GET /:category/posts
export const getPostsByCategory = (category) =>
  fetch(`${api}/${category}/posts`, { headers })
    .then((res) => res.json())
    .then((data) => data);

// GET /posts
export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then((res) => res.json())
    .then((data) => data);

// POST /posts
// id - UUID should be fine, but any unique id will work
// timestamp - [Timestamp] Can in whatever format you like, you can use Date.now() if you like.
// title - [String]
// body - [String]
// author - [String]
// category - Any of the categories listed in categories.js.
export const addPost = (post) => {
  const newPost = {
    id: generateUID(),
    timestamp: Date.now(),
    ...post,
  };

  return fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  })
    .then((res) => res.json())
    .then((data) => data);
};

// GET /posts/:id
export const getPostById = (id) =>
  fetch(`${api}/posts/${id}`, { headers })
    .then((res) => res.json())
    .then((data) => data);

// POST /posts/:id
// option - [String]: Either "upVote" or "downVote".
export const addVoteToPost = (id, vote) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      option: vote,
    }),
  });

// PUT /posts/:id
// title - [String]
// body - [String]
export const editPost = (id, post) =>
  fetch(`${api}/posts/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });

// DELETE /posts/:id
export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });

// GET /posts/:id/comments
export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, { headers })
    .then((res) => res.json())
    .then((data) => data);

// POST /comments
// id - Any unique ID. As with posts, UUID is probably the best here.
// timestamp - [Timestamp] Get this however you want.
// body - [String]
// author - [String]
// parentId - Should match a post id in the database.
export const addComment = (comment) => {
  const newComment = {
    id: generateUID(),
    timestamp: Date.now(),
    ...comment,
  };

  return fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComment),
  })
    .then((res) => res.json())
    .then((data) => data);
};

// GET /comments/:id
export const getComment = (id) =>
  fetch(`${api}/comments/${id}`, { headers })
    .then((res) => res.json())
    .then((data) => data);

// POST /comments/:id
// option - [String]: Either "upVote" or "downVote"
export const addVoteToComment = (id, vote) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      option: vote,
    }),
  });

// PUT /comments/:id
// timestamp - timestamp. Get this however you want.
// body - [String]
export const editComment = (id, comment) =>
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });

// DELETE /comments/:id
export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  });
