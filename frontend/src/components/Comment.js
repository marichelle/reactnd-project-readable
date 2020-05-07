import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleAddVoteToComment, handleDeleteComment } from '../actions/shared';
import { formatDate } from '../utils/helper';

class Comment extends Component {
  handleAddVoteToComment = (e, vote) => {
    e.preventDefault();

    this.props.handleAddVoteToComment(this.props.id, vote);
  };

  handleDeleteComment = (e) => {
    e.preventDefault();

    this.props.handleDeleteComment(this.props.id);
  };

  render() {
    const { timestamp, author, body, id, voteScore } = this.props;

    return (
      <div key={id} className="comment">
        <div className="avatar">
          <span className="ui blue circular large label">{voteScore}</span>
        </div>
        <div className="content">
          <a className="author">{author}</a>
          <div className="metadata">
            <div className="date">{formatDate(timestamp)}</div>
          </div>
          <div className="text">{body}</div>
          <div className="actions">
            <a
              href="/#"
              onClick={(e) => this.handleAddVoteToComment(e, 'upVote')}
            >
              <i className="thumbs up outline icon"></i>
              Like
            </a>
            <a
              href="/#"
              onClick={(e) => this.handleAddVoteToComment(e, 'downVote')}
            >
              <i className="thumbs down outline icon"></i>
              Dislike
            </a>
            <a href="/#">
              <i className="edit outline icon"></i>
              Edit
            </a>
            <a href="/#" onClick={this.handleDeleteComment}>
              <i className="trash alternate outline icon"></i>
              Delete
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  handleAddVoteToComment,
  handleDeleteComment,
})(Comment);
