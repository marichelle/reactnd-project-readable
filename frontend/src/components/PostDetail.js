import React, { Component } from 'react';
import { connect } from 'react-redux';

import Comments from './Comments';
import Post from './Post';
import Error404 from './Error404';

class PostDetail extends Component {
  render() {
    const { post } = this.props;

    if (post.id !== undefined) {
      return (
        <div className="ui container">
          <Post {...post} disableHeaderLink={true} />
          <Comments comments={post.comments} parentId={post.id} />
        </div>
      );
    } else {
      return <Error404 message={'This post does not exist.'} />;
    }
  }
}

const mapStateToProps = ({ posts }, { match }) => {
  const {
    params: { id },
  } = match;

  const post = id.length && posts.length ? posts.filter((p) => p.id === id) : {};

  return { post: post.length ? post[0] : {} };
};

export default connect(mapStateToProps)(PostDetail);
