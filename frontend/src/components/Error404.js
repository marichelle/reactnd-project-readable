import React from 'react';

export default ({ message }) => {
  return (
    <div className="ui center aligned container">
      <div className="ui compact error message">
        <div className="header">Error Found</div>
        {message === undefined ? (
          <p>This post does not exist.</p>
        ) : (
          <p>{message}</p>
        )}
      </div>
    </div>
  );
};
