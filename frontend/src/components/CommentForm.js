import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleAddComment } from '../actions/shared';

class CommentForm extends Component {
  state = {
    redirect: null,
    author: '',
    body: '',
  };

  componentDidMount() {}

  handleChange = (e) => {
    const field = e.target.name;
    const text = e.target.value;

    this.setState(() => ({
      [field]: text,
    }));
  };

  handleSubmit = () => {
    const { handleAddComment, parentId } = this.props;
    const { author, body } = this.state;

    handleAddComment({
      author,
      body,
      parentId,
    });

    // reset state
    this.setState(() => ({
      redirect: null,
      category: '',
      author: '',
      title: '',
      body: '',
    }));
  };

  render() {
    const { author, body } = this.state;
    const disableSubmit = author === '' || body === '';

    return (
      <form className="ui reply form">
        <div className="field">
          <label>Name:</label>
          <input
            type="text"
            name="author"
            onChange={this.handleChange}
            placeholder="Enter Your Name"
            value={author}
          />
        </div>
        <div className="field">
          <label>Comment:</label>
          <textarea
            name="body"
            onChange={this.handleChange}
            placeholder="Enter Comment..."
            value={body}
          ></textarea>
        </div>
        <div
          className={`ui primary submit labeled icon button ${
            disableSubmit === true ? 'disabled' : ''
          }`}
          onClick={this.handleSubmit}
        >
          <i className="icon edit"></i>
          Add Comment
        </div>
      </form>
    );
  }
}

export default connect(null, {
  handleAddComment,
})(CommentForm);
