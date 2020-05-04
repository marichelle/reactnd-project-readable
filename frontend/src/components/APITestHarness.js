import React, { Component } from 'react';

import { generateUID } from '../utils/helper';
import {
  addPost,
  addVoteToPost,
  deletePost,
  editPost,
  getAllCategories,
  getAllPosts,
  getPostById,
  getPostsByCategory,
} from '../utils/api';

export default class APITestHarness extends Component {
  state = {
    categories: '',
    posts: '',
  };

  componentDidMount() {
    this.handleGetCategories();
    this.handleGetPosts();
  }

  handleAddPost = (e, cat) => {
    e.preventDefault();

    const post = {
      id: generateUID(),
      category: cat,
      timestamp: Date.now(),
      author: 'marichelle',
      title: `This is a test post in the ${cat} category`,
      body:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, obcaecati? Obcaecati voluptate, libero illum suscipit adipisci voluptates recusandae quis quod animi ipsam nam natus nisi in sunt molestiae tempore eligendi!',
      voteScore: 1,
    };

    addPost(post).then(() =>
      this.setState((prevState) => ({
        posts: [...prevState.posts].concat(post),
      }))
    );
  };

  handleDeletePost = (e, id) => {
    e.preventDefault();

    deletePost(id).then(() =>
      this.setState((prevState) => ({
        posts: prevState.posts.filter((p) => p.id !== id),
      }))
    );
  };

  handleEditPost = (e, id) => {
    e.preventDefault();

    const post = {
      author: 'mayae',
    };

    editPost(id, post).then(() =>
      this.setState((prevState) => ({
        posts: prevState.posts.map((p) =>
          p.id !== id ? p : { ...p, author: post.author }
        ),
      }))
    );
  };

  handleGetCategories = () =>
    getAllCategories().then((result) => {
      console.log('categories', result);

      this.setState(() => ({
        categories: result,
      }));
    });

  handleGetPostById = (e, id) => {
    e.preventDefault();

    getPostById(id).then((result) => {
      console.log('post', result);
    });
  };

  handleGetPosts = () =>
    getAllPosts().then((result) => {
      console.log('posts', result);

      this.setState(() => ({
        posts: result,
      }));
    });

  handleGetPostsByCategory = (e, cat) => {
    e.preventDefault();

    if (cat !== undefined) {
      getPostsByCategory(cat).then((result) => {
        console.log('category posts', result);

        this.setState(() => ({
          posts: result,
        }));
      });
    } else {
      this.handleGetPosts();
    }
  };

  handleVote = (e, id, vote) => {
    e.preventDefault();

    addVoteToPost(id, vote).then(() =>
      this.setState((prevState) => ({
        posts: prevState.posts.map((post) =>
          post.id !== id
            ? post
            : {
                ...post,
                voteScore:
                  vote === 'upVote' ? post.voteScore + 1 : post.voteScore - 1,
              }
        ),
      }))
    );
  };

  render() {
    const { categories, posts } = this.state;

    return (
      <div>
        <h3>API Test Harness</h3>
        <h4>Categories</h4>
        <ul>
          <li>
            <a href="#/" onClick={(e) => this.handleGetPostsByCategory(e)}>
              all
            </a>
          </li>
          {categories !== '' &&
            categories.map((cat) => (
              <li key={cat.path}>
                <a
                  href="/#"
                  onClick={(e) => this.handleGetPostsByCategory(e, cat.path)}
                >
                  {cat.name}
                </a>{' '}
                (
                <a href="/#" onClick={(e) => this.handleAddPost(e, cat.path)}>
                  Add Post
                </a>
                )
              </li>
            ))}
        </ul>
        <h4>Posts</h4>
        <ul>
          {posts.length !== 0 ? (
            posts.map((post) => (
              <li key={post.id}>
                <div>
                  <a
                    href="/#"
                    onClick={(e) => this.handleGetPostById(e, post.id)}
                  >
                    {post.title} - {post.author} - {post.voteScore}
                  </a>
                  <br />
                  <a
                    href="/#"
                    onClick={(e) => this.handleVote(e, post.id, 'upVote')}
                  >
                    upvote
                  </a>
                  -
                  <a
                    href="/#"
                    onClick={(e) => this.handleVote(e, post.id, 'downVote')}
                  >
                    downvote
                  </a>
                  -
                  <a href="/#" onClick={(e) => this.handleEditPost(e, post.id)}>
                    edit
                  </a>
                  -
                  <a href="/#" onClick={(e) => this.handleDeletePost(e, post.id)}>
                    delete
                  </a>
                </div>
              </li>
            ))
          ) : (
            <li>No results found</li>
          )}
        </ul>
      </div>
    );
  }
}
