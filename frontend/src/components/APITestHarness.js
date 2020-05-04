import React, { Component } from 'react';

import { generateUID } from '../utils/helper';
import {
  addPost,
  getAllCategories,
  getAllPosts,
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

  handleAddPost = (evt, cat) => {
    evt.preventDefault();

    const post = {
      id: generateUID(),
      category: cat,
      timestamp: Date.now(),
      author: 'marichelle',
      title: `This is a test post in the ${cat} category`,
      body:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, obcaecati? Obcaecati voluptate, libero illum suscipit adipisci voluptates recusandae quis quod animi ipsam nam natus nisi in sunt molestiae tempore eligendi!',
    };

    addPost(post);
  };

  handleGetCategories = () =>
    getAllCategories().then((result) => {
      console.log('categories', result);

      this.setState(() => ({
        categories: result,
      }));
    });

  handleGetPosts = () =>
    getAllPosts().then((result) => {
      console.log('posts', result);

      this.setState(() => ({
        posts: result,
      }));
    });

  handleGetPostsByCategory = (evt, cat) => {
    evt.preventDefault();

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
                {post.author} - {post.category} - {post.title}|
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
