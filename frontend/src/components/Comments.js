import React, { Component } from 'react';

import Comment from './Comment';
import CommentForm from './CommentForm';

class Comments extends Component {
  render() {
    const { comments, parentId } = this.props;

    return (
      <div className="ui comments">
        {comments !== undefined &&
          comments.length > 0 &&
          comments.map((comment) => <Comment key={comment.id} {...comment} />)}
        <div className="ui hidden divider" />
        <CommentForm parentId={parentId} />
      </div>
    );
  }
}

export default Comments;
