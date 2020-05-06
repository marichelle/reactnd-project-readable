import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { handleAddPost, handleEditPost } from '../actions/shared';

class PostForm extends Component {
  state = {
    redirect: null,
    category: '',
    author: '',
    title: '',
    body: '',
  };

  componentDidMount() {
    if (Object.entries(this.props.post).length !== 0) {
      this.setState(() => ({
        category: this.props.post.category,
        author: this.props.post.author,
        title: this.props.post.title,
        body: this.props.post.body,
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

    const { form, handleAddPost, handleEditPost, post } = this.props;
    const { category, author, title, body } = this.state;

    if (form === 'add') {
      handleAddPost({
        category,
        author,
        title,
        body,
      });
    } else {
      handleEditPost(post.id, {
        title,
        body,
      });
    }

    // reset state
    this.setState(() => ({
      redirect:
        post.id === undefined ? `/${category}` : `/${category}/${post.id}`,
      category: '',
      author: '',
      title: '',
      body: '',
    }));
  };

  render() {
    const { form } = this.props;
    const { redirect, category, author, title, body } = this.state;
    const disableSubmit =
      author === '' || body === '' || category === '' || title === '';

    /* Redirect to root if submitted */
    if (redirect) {
      return <Redirect to={redirect} />;
    }

    return (
      <form className="ui form" onSubmit={this.handleSubmit}>
        <div className="ui raised very padded text container segments">
          <div className="ui segment">
            <h2>{form === 'add' ? 'Add New' : 'Edit'} Post</h2>
          </div>
          <div className="ui segment">
            <div className="field">
              <label>Category</label>
              <select
                className="ui dropdown"
                name="category"
                disabled={form === 'edit'}
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
                disabled={form === 'edit'}
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
            <button
              type="submit"
              className="ui fluid blue button"
              disabled={disableSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapStateToProps = ({ posts }, { match }) => {
  const {
    params: { id },
  } = match;

  if (posts.length) {
    const filteredPosts = posts.filter((post) => post.id === id);

    if (filteredPosts.length) {
      return {
        form: 'edit',
        post: {
          id: filteredPosts[0].id,
          category: filteredPosts[0].category,
          author: filteredPosts[0].author,
          title: filteredPosts[0].title,
          body: filteredPosts[0].body,
        },
      };
    }
  }

  return {
    form: 'add',
    post: {},
  };
};

export default connect(mapStateToProps, {
  handleAddPost,
  handleEditPost,
})(PostForm);
