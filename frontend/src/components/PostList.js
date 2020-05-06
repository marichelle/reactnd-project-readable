import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { handleAddVoteToPost, handleRemovePost } from '../actions/shared';
import { formatDate } from '../utils/helper';

class Posts extends Component {
  handleAddVoteToPost = (e, id, vote) => {
    e.preventDefault();

    this.props.handleAddVoteToPost(id, vote);
  };

  handleDeletePost = (e, id) => {
    e.preventDefault();

    this.props.handleRemovePost(id);
  };

  render() {
    const { posts } = this.props;

    return (
      <>
        {posts.length > 0 &&
          posts.map((post) => (
            <div key={post.id} className="ui segments">
              <div className="ui segment">
                <h3>{post.title}</h3>
                Posted by {post.author} on {formatDate(post.timestamp)}
              </div>
              <div className="ui segment">
                <div className="ui grid">
                  <div className="two wide right aligned column">
                    <a
                      href="/#"
                      onClick={(e) =>
                        this.handleAddVoteToPost(e, post.id, 'upVote')
                      }
                    >
                      <i className="chevron up large icon"></i>
                    </a>
                    <span className="ui blue circular large label">
                      {post.voteScore}
                    </span>
                    <a
                      href="/#"
                      onClick={(e) =>
                        this.handleAddVoteToPost(e, post.id, 'downVote')
                      }
                    >
                      <i className="chevron down large icon"></i>
                    </a>
                  </div>
                  <div className="fourteen wide column">
                    <p>{post.body}</p>
                  </div>
                </div>
              </div>
              <div className="ui horizontal segments">
                <div className="ui segment">
                  <div className="ui grid">
                    <div className="eight wide column">
                      <div className="ui label">{post.commentCount} comments</div>
                    </div>
                    <div className="eight wide right aligned column">
                      <Link to={`/post/edit/${post.id}`}>
                        <i className="edit outline large icon"></i>
                      </Link>
                      <a
                        href="/#"
                        onClick={(e) => this.handleDeletePost(e, post.id)}
                      >
                        <i className="trash alternate outline large icon"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

export default connect(mapStateToProps, {
  handleAddVoteToPost,
  handleRemovePost,
})(Posts);
