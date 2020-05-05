import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { addVoteToPost } from '../actions/posts';
import { formatDate } from '../utils/helper';

class Posts extends Component {
  handleAddVoteToPost = (e, id, vote) => {
    e.preventDefault();

    this.props.addVoteToPost(id, vote);
  };

  render() {
    const { posts } = this.props;

    return (
      <div className="ui items">
        {posts.length > 0 &&
          posts.map((post) => (
            <Fragment key={post.id}>
              <div className="item">
                <div className="content">
                  <a className="header">{post.title}</a>
                  <div className="meta">
                    <span className="cinema">
                      {post.author} | {formatDate(post.timestamp)}
                    </span>
                  </div>
                  <div className="description">
                    <p>{post.body}</p>
                  </div>
                  <div className="extra">
                    <a
                      href="/#"
                      onClick={(e) =>
                        this.handleAddVoteToPost(e, post.id, 'upVote')
                      }
                    >
                      <i className="chevron up large icon"></i>
                    </a>
                    <a className="ui blue circular label">{post.voteScore}</a>
                    <a
                      href="/#"
                      onClick={(e) =>
                        this.handleAddVoteToPost(e, post.id, 'downVote')
                      }
                    >
                      <i className="chevron down large icon"></i>
                    </a>
                    <div className="ui label">{post.commentCount} comments</div>
                    <i className="trash alternate outline large right floated icon"></i>
                    <i className="edit outline large right floated icon"></i>
                  </div>
                </div>
              </div>
              <div className="ui divider" />
            </Fragment>
          ))}
      </div>
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
      posts.sort((a, b) => a.timestamp - b.timestamp);
  }

  return {
    posts:
      category !== 'all'
        ? posts.filter((post) => post.category === category)
        : posts,
  };
};

export default connect(mapStateToProps, { addVoteToPost })(Posts);
