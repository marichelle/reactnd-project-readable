import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { formatDate } from '../utils/helper';
import { handleAddVoteToPost, handleDeletePost } from '../actions/shared';

class Post extends Component {
  state = {
    redirect: '',
  };

  handleAddVoteToPost = (e, vote) => {
    e.preventDefault();

    this.props.handleAddVoteToPost(this.props.id, vote);
  };

  handleDeletePost = (e) => {
    e.preventDefault();

    this.props.handleDeletePost(this.props.id);

    this.setState(() => ({
      redirect: '/',
    }));
  };

  render() {
    const {
      timestamp,
      category,
      author,
      title,
      body,
      id,
      disableHeaderLink,
      commentCount,
      voteScore,
    } = this.props;
    const { redirect } = this.state;

    /* Redirect to root if submitted */
    if (redirect) {
      return <Redirect to={redirect} />;
    }

    const columnWidth =
      disableHeaderLink === undefined ? ['two', 'fourteen'] : ['one', 'fifteen'];

    return (
      <div key={id} className="ui segments">
        <div className="ui segment">
          {disableHeaderLink === undefined ? (
            <Link to={`/${category}/${id}`}>
              <h3>{title}</h3>
            </Link>
          ) : (
            <h3>{title}</h3>
          )}
          Posted by {author} on {formatDate(timestamp)}
        </div>
        <div className="ui segment">
          <div className="ui grid">
            <div className={`${columnWidth[0]} wide right aligned column`}>
              <a href="/#" onClick={(e) => this.handleAddVoteToPost(e, 'upVote')}>
                <i className="chevron up large icon"></i>
              </a>
              <span className="ui blue circular large label">{voteScore}</span>
              <a
                href="/#"
                onClick={(e) => this.handleAddVoteToPost(e, 'downVote')}
              >
                <i className="chevron down large icon"></i>
              </a>
            </div>
            <div className={`${columnWidth[1]} wide column`}>
              <p>{body}</p>
            </div>
          </div>
        </div>
        <div className="ui horizontal segments">
          <div className="ui segment">
            <div className="ui grid">
              <div className="eight wide column">
                <div className="ui label">{commentCount} comments</div>
              </div>
              <div className="eight wide right aligned column">
                <Link to={`/post/edit/${id}`}>
                  <i className="edit outline large icon"></i>
                </Link>
                <a href="/#" onClick={this.handleDeletePost}>
                  <i className="trash alternate outline large icon"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  handleAddVoteToPost,
  handleDeletePost,
})(Post);
