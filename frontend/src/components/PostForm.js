import React, { Component } from 'react';
import { connect } from 'react-redux';

import Error404 from './Error404';
import { handleAddPost, handleEditPost } from '../actions/shared';
import { getPostById } from '../utils/api';

class PostForm extends Component {
  state = {
    category: '',
    author: '',
    title: '',
    body: '',
  };

  async componentDidMount() {
    if (this.props.id) {
      const post = await getPostById(this.props.id);

      this.setState(() => ({
        category: post.category,
        author: post.author,
        title: post.title,
        body: post.body,
      }));
    }
  }

  handleChange = (e) => {
    const field = e.target.name;
    const text = e.target.value;

    this.setState(() => ({
      [field]: text,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { handleAddPost, handleEditPost, id } = this.props;
    const { category, author, title, body } = this.state;

    if (id === undefined) {
      handleAddPost({
        category,
        author,
        title,
        body,
      });
    } else {
      handleEditPost(id, {
        title,
        body,
      });
    }

    this.props.history.goBack();

    // reset state
    this.setState(() => ({
      category: '',
      author: '',
      title: '',
      body: '',
    }));
  };

  render() {
    const { id } = this.props;
    const { category, author, title, body } = this.state;
    const disableSubmit =
      author === '' || body === '' || category === '' || title === '';

    if (id && author === undefined) {
      return <Error404 message={'This post does not exist.'} />;
    }

    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <div className="ui raised very padded text container segments">
          <div className="ui segment">
            <h2>{id === undefined ? 'Add New' : 'Edit'} Post</h2>
          </div>
          <div className="ui segment">
            <div className="field">
              <label>Category</label>
              <select
                className="ui dropdown"
                name="category"
                disabled={id !== undefined}
                onChange={this.handleChange}
                value={category}
              >
                <option>Select a Category:</option>
                <option value="react">react</option>
                <option value="redux">redux</option>
                <option value="udacity">udacity</option>
              </select>
            </div>
            <div className="field">
              <label>Author</label>
              <input
                type="text"
                name="author"
                disabled={id !== undefined}
                placeholder="Enter Your Name Here"
                onChange={this.handleChange}
                value={author}
              />
            </div>
            <div className="field">
              <label>Post Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter Title Here"
                onChange={this.handleChange}
                value={title}
              />
            </div>
            <div className="field">
              <label>Post Body</label>
              <textarea
                name="body"
                placeholder="Enter Comments Here"
                onChange={this.handleChange}
                value={body}
              ></textarea>
            </div>
            <div className="ui grid container">
              <div className="ui eight wide column">
                <button
                  type="submit"
                  className="ui fluid blue button"
                  disabled={disableSubmit}
                >
                  Submit
                </button>
              </div>
              <div className="ui eight wide column">
                <button
                  type="button"
                  className="ui fluid blue button"
                  onClick={() => this.props.history.goBack()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const {
    params: { id },
  } = match;

  return {
    id,
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleAddPost: (post) => dispatch(handleAddPost(post, props)),
    handleEditPost: (id, post) => dispatch(handleEditPost(id, post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
