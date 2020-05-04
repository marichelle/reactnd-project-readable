import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <h1 className="ui dividing header app-header">
        <i className="list icon"></i>
        <div className="content">READABLE</div>
      </h1>
    );
  }
}
