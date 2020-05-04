import React, { Component } from 'react';

import APITestHarness from './APITestHarness';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="ui grid container app-container">
        <div className="ui four wide column">
          <div className="ui secondary vertical pointing menu">
            <a className="active item">All</a>
            <a className="item">React</a>
            <a className="item">Redux</a>
          </div>
        </div>
        <div className="ui twelve wide column">
          <APITestHarness />
        </div>
      </div>
    );
  }
}
