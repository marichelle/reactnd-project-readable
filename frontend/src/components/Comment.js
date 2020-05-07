import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  handleAddVoteToComment,
  handleDeleteComment,
  handleEditComment,
} from '../actions/shared';
import { formatDate } from '../utils/helper';

class Comment extends Component {
  state = {
    body: '',
    edit: false,
  };

  componentDidMount() {
    this.setState(() => ({
      body: this.props.body,
    }));
  }

  handleAddVoteToComment = (e, vote) => {
    e.preventDefault();

    this.props.handleAddVoteToComment(this.props.id, vote);
  };

  handleDeleteComment = (e) => {
    e.preventDefault();

    this.props.handleDeleteComment(this.props.id);
  };

  handleChange = (e) => {
    const field = e.target.name;
    const text = e.target.value;

    this.setState(() => ({
      [field]: text,
    }));
  };

  handleEditComment = (e) => {
    e.preventDefault();

    this.setState((prevState) => ({
      edit: !prevState.edit,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.handleEditComment(this.props.id, this.state.body);

    // reset state
    this.setState(() => ({
      edit: false,
    }));
  };

  render() {
    const { author, body, id, timestamp, voteScore } = this.props;
    const { edit } = this.state;

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
            <a href="/#" onClick={this.handleEditComment}>
              <i className="edit outline icon"></i>
              Edit
            </a>
            <a href="/#" onClick={this.handleDeleteComment}>
              <i className="trash alternate outline icon"></i>
              Delete
            </a>
          </div>
          {edit === true && (
            <form className="ui reply form">
              <div className="field">
                <textarea
                  name="body"
                  defaultValue={body}
                  onChange={this.handleChange}
                />
              </div>
              <button className="ui primary button" onClick={this.handleSubmit}>
                Save
              </button>
              <button className="ui button" onClick={this.handleEditComment}>
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default connect(null, {
  handleAddVoteToComment,
  handleDeleteComment,
  handleEditComment,
})(Comment);
