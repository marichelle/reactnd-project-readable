import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from './Post';

class Posts extends Component {
  render() {
    const { posts } = this.props;

    return (
      <>
        {posts.length > 0 &&
          posts.map((post) => <Post key={post.id} {...post} />)}
      </>
    );
  }
}

const mapStateToProps = ({ posts }, { category, sort }) => {
  switch (sort) {
    case 'comments':
      posts.sort((a, b) => b.commentCount - a.commentCount);
      break;

    case 'votes':
      posts.sort((a, b) => b.voteScore - a.voteScore);
      break;

    default:
      posts.sort((a, b) => b.timestamp - a.timestamp);
  }

  return {
    posts:
      category !== undefined
        ? posts.filter((post) => post.category === category)
        : posts,
  };
};

export default connect(mapStateToProps)(Posts);
