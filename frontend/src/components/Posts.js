import React, { Component } from 'react';
import { connect } from 'react-redux';

class Posts extends Component {
  render() {
    const { posts } = this.props;

    return (
      <div className="ui container">
        {posts.length > 0 &&
          posts.map((post) => (
            <div key={post.id} className="ui items">
              <div className="item">
                <div className="content">
                  <a className="header">{post.title}</a>
                  <div className="meta">
                    <span className="cinema">{post.author}</span>
                  </div>
                  <div className="description">
                    <p>{post.body}</p>
                  </div>
                  <div className="extra">
                    <i className="chevron up large icon"></i>
                    <span>{post.voteScore}</span>
                    <i className="chevron down large icon"></i>
                    <div className="ui label">{post.commentCount} comments</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => {
  return {
    posts,
  };
};

export default connect(mapStateToProps)(Posts);
