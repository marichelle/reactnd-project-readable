import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <h1 className="ui dividing header app-header">
        <div className="content">
          <Link to="/">READABLE</Link>
        </div>
      </h1>
    );
  }
}
